package com.example.api.controllers;

import com.example.api.entities.Profile;
import com.example.api.entities.Role;
import com.example.api.entities.User;
import com.example.api.enumerations.RoleEnum;
import com.example.api.payloads.requests.LoginRequest;
import com.example.api.payloads.requests.SignupRequest;
import com.example.api.payloads.responses.MessageResponse;
import com.example.api.repositories.RoleRepository;
import com.example.api.repositories.UserRepository;
import com.example.api.security.services.UserDetailsImplementation;
import com.example.api.security.services.jwt.JwtUtils;
import com.example.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping(path="/api/auth")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response){
        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
        if(user.isEmpty()){
            return new ResponseEntity<String>("Username does not exist", HttpStatus.UNAUTHORIZED);
        } else {
            if(!encoder.matches(loginRequest.getPassword(),user.get().getPassword())){
                return new ResponseEntity<String>("Passwords do not match", HttpStatus.UNAUTHORIZED);
            }
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImplementation userDetails = (UserDetailsImplementation) authentication.getPrincipal();

        HttpCookie accessTokenCookie = jwtUtils.createHttpCookieWithToken("presence", jwt, 86400);
        Cookie loginStateCookie = jwtUtils.createCookieWithToken("c_user", userDetails.getUsername(), 86400);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        response.addCookie(loginStateCookie);

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString()).body("Log In Successful");
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUserPost(@Valid @RequestBody SignupRequest signupRequest){
        //Verify Username and Email
        if(userRepository.existsByUsername(signupRequest.getUsername())){
            return new ResponseEntity<String>("Username already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User(signupRequest.getUsername(), encoder.encode(signupRequest.getPassword()));

        //Roles
        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if(strRoles == null){
            Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER).
                    orElseThrow(()-> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch(role){
                    case("admin"):
                        Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN).
                                orElseThrow(()-> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    case("mod"):
                        Role modRole = roleRepository.findByName(RoleEnum.ROLE_MODERATOR).
                                orElseThrow(()-> new RuntimeException("Error: Role is not found"));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER).
                                orElseThrow(()-> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                }
            });
        }

        //Save a new profile to user
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setUsername(signupRequest.getUsername());
        profile.setEmail(signupRequest.getEmail());
        user.setProfile(profile);

        //Save to user
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/isLoggedIn")
    public ResponseEntity<?> isLoggedIn(Principal principal){
        if(principal != null) {
            return new ResponseEntity<String>("User is logged in", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("User is not logged in", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getCurrentUser")
    public UserDetails getCurrentUserDetails(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails;
    }
}