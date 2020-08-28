package com.example.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;

@Configuration
@EnableCaching
@EnableRedisHttpSession
public class RedisConfig extends AbstractHttpSessionApplicationInitializer {
    @Value("${dev.redis.hostname}")
    private String devRedisHostname;

    @Value("${dev.redis.port}")
    private int devRedisPort;

    @Value("${redis.hostname}")
    private String redisHostName;

    @Value("${redis.port}")
    private int redisPort;

//    @Value("${redis.prefix}")
//    private String redisPrefix;


    @Bean
    JedisConnectionFactory jedisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration(devRedisHostname, devRedisPort);
        return new JedisConnectionFactory(redisStandaloneConfiguration);
    }
}
