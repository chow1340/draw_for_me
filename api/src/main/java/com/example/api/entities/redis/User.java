package com.example.api.entities.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.RedisTemplate;

import java.io.Serializable;

@RedisHash("User")
public class User implements Serializable {


}
