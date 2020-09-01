package com.example.api.repositories.redis;

import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@RedisHash("UserSession")
public class UserSession implements Serializable {

}
