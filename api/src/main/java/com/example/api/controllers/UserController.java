package com.example.api.controllers;

import com.example.api.entities.Role;
import com.example.api.entities.User;
import com.example.api.enumerations.RoleEnum;
import com.example.api.payloads.requests.SignupRequest;
import com.example.api.payloads.responses.MessageResponse;
import com.example.api.repositories.RoleRepository;
import com.example.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping(path="/api/auth")
public class UserController {

//    @Autowired
//    private UserService userService;
//
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

//    @RequestMapping(value = "/register", method = RequestMethod.POST)
//    public ResponseEntity<Object> registerUserPost (
//            @RequestBody UserDTO registerPost
//    ) {
//        RegisterResult result = userService.registerNewUser(registerPost);
//        if(result == RegisterResult.REGISTER_SUCCESS) {
//            return new ResponseEntity<>("User has been saved", HttpStatus.CREATED);
//        }
//        switch(result) {
//            case EMAIL_EXISTS:
//                return new ResponseEntity<>("Email already exists", HttpStatus.CREATED);
//            case REGISTER_SUCCESS:
//                return new ResponseEntity<>("User has been saved", HttpStatus.CREATED);
//            default:
//                return new ResponseEntity<>("Registration Error", HttpStatus.BAD_REQUEST);
//        }
//    }

//    @RequestMapping(value = "/logIn" ,method = RequestMethod.POST)
//    public ResponseEntity<Object> logInUserPost(@RequestBody UserDTO userDTO, HttpServletRequest req) {
//        LogInResult result = userService.logInUser(userDTO, req);
//        switch(result){
//            case USER_DOES_NOT_EXIST:
//                return new ResponseEntity<>("User does not exists", HttpStatus.CREATED);
//            case PASSWORD_DO_NOT_MATCH:
//                return new ResponseEntity<>("Passwords do not match", HttpStatus.CREATED);
//            default:
//                return new ResponseEntity<>("Log in successful", HttpStatus.CREATED);
//
//        }
//    }
    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody SignupRequest signupRequest){
        System.out.println("rantest");
        return ResponseEntity.ok(new MessageResponse("testok!"));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUserPost(@Valid @RequestBody SignupRequest signupRequest){
        //Verify Username and Email
        if(userRepository.existsByUsername(signupRequest.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is taken"));
        }
        if(userRepository.existsByEmail(signupRequest.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use"));
        }
        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), encoder.encode(signupRequest.getPassword()));

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
        user.setRoles(roles);
        userRepository.save(user);


        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


}