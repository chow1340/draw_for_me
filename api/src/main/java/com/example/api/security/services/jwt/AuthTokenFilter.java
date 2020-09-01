package com.example.api.security.services.jwt;

import com.example.api.security.services.UserDetailsServiceImplementation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//Filters requests
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtutils;

    @Autowired
    private UserDetailsServiceImplementation userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            //Parse JWT
            if(jwt != null && jwtutils.validateJwtToken(jwt)){
                String username = jwtutils.getUsernameFromJwtToken(jwt);
                //Get userdetails to create and authentication object
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                //Set current user details in security context
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }
        filterChain.doFilter(request, response);
    }

    //Get JWT by removing Bearer prefix
    private String parseJwt(HttpServletRequest request){
        Cookie cookie = WebUtils.getCookie(request, "presence");
//        String headerAuth = request.getHeader("Authorization");
        if(cookie == null) {
            return null;
        }
        String headerAuth = cookie.getValue();
        if(StringUtils.hasText(headerAuth)){
            return headerAuth;
        }
//        if(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")){
//            return headerAuth.substring(7, headerAuth.length());
//        }
        return null;
    }
}
