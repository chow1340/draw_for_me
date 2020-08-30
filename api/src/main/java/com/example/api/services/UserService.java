package com.example.api.services;

import com.example.api.entities.User;
import com.example.api.enumerations.LogInResult;
import com.example.api.enumerations.RegisterResult;
import com.example.api.payloads.UserDTO;
import com.example.api.repositories.UserRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.api.helpers.UserSpecifications;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Service
public class UserService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    private UserSpecifications userSpecifications;

    public boolean checkIfExists(String columnName, String value){
        List<User> users = userRepository.findAll(userSpecifications.byColumnNameAndValue(columnName, value));
        if(users.size() > 0) {
            return true;
        }
        return false;
    }


    public RegisterResult registerNewUser(UserDTO userDTO){
        if(checkIfExists("email", userDTO.getEmail())) {
            return RegisterResult.EMAIL_EXISTS;
        }
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);
        return RegisterResult.REGISTER_SUCCESS;
    }

    public LogInResult logInUser(@NotNull UserDTO userDTO, HttpServletRequest req){
        List<User> findUsers = userRepository.findAll(userSpecifications.byColumnNameAndValue("email", userDTO.getEmail()));

        if(findUsers.size() == 0) {return LogInResult.USER_DOES_NOT_EXIST;}
        User dbUser = findUsers.get(0);

        if(!passwordEncoder.matches(userDTO.getPassword(),dbUser.getPassword())){
            return LogInResult.PASSWORD_DO_NOT_MATCH;
        }
//        //Create session
//        System.out.println(req.getParameterMap());
//        req.getSession().setAttribute("tesName", "testVal");

        return LogInResult.LOG_IN_SUCCESS;
    };
}
