package com.example.api.services;

import com.example.api.entities.Profile;
import com.example.api.security.services.UserDetailsImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

@Service
public class UserService {
    @Autowired
    private RedisTemplate< String, Object > template;

    public void sessionExists(String userId) {
        template.hasKey(userId);
    }

    public void addUserSession(String userId, String sessionToken){
        template.opsForValue().set(userId, sessionToken);
    }
    public UserDetailsImplementation getCurrentUserDetails(){
        UserDetailsImplementation userDetails = (UserDetailsImplementation) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails;
    }

    public Long getCurrentUserId(){
        UserDetailsImplementation userDetails = getCurrentUserDetails();
        return userDetails.getId();
    }

}
