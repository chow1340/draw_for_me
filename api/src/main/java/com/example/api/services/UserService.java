package com.example.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
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
}
