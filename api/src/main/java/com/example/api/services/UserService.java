package com.example.api.services;

import com.example.api.entities.Profile;
import com.example.api.entities.User;
import com.example.api.repositories.UserRepository;
import com.example.api.security.services.UserDetailsImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDetailsImplementation getCurrentUserDetails(){
        UserDetailsImplementation userDetails = (UserDetailsImplementation) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails;
    }

    public Long getCurrentUserId(){
        UserDetailsImplementation userDetails = getCurrentUserDetails();
        return userDetails.getId();
    }

    public User getCurrentUser(){
        Long currentUserId=getCurrentUserId();
        User user = userRepository.findById(currentUserId)
                .orElseThrow(()-> new UsernameNotFoundException("User not found with userId: " + currentUserId));
        return user;
    }

}
