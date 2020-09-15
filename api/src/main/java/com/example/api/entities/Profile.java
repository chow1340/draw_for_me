package com.example.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;

@Entity
@Table(
        name="profile"
)
public class Profile{
    @Id
    @Column(name="user_id")
    private Long id;

    @OneToOne
    @MapsId
    @JsonIgnore
    private User user;

    @Email
    @Column(name="email")
    private String email;

    @Column(name="username")
    private String username;

    @Column(name="description")
    private String description;

    @Column(name="profile_image_url")
    private String profileImageUrl;

    @Column(name="banner_image_url")
    private String bannerImageUrl;

    public Profile() {

    }
    public Profile(Long id, User user, String username, String description, @Email String email, String profileImageUrl) {
        this.id = id;
        this.user = user;
        this.username = username;
        this.description = description;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public String getBannerImageUrl() {
        return bannerImageUrl;
    }

    public void setBannerImageUrl(String bannerImageUrl) {
        this.bannerImageUrl = bannerImageUrl;
    }

}
