package com.example.api.services;

import com.example.api.entities.User;
import com.example.api.enumerations.LogInResult;
import com.example.api.enumerations.RegisterResult;
import com.example.api.objects.UserDTO;
import com.example.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.api.helpers.UserSpecifications;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.swing.text.html.parser.Entity;
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

    public LogInResult logInUser(UserDTO userDTO){
        List<User> user = userRepository.findAll(userSpecifications.byColumnNameAndValue("email", userDTO.getEmail()));
        if(user.size() == 0) return LogInResult.USER_DOES_NOT_EXIST;
        return LogInResult.LOG_IN_SUCCESS;
    };
}
