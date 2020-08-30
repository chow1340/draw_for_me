package com.example.api.payloads;

public class UserDTO {
    private String email;
    private String username;
    private String password;
    private String confirmPassword;

    public String getEmail() {
        return email;
    }

    public String getUsername(){
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

}
