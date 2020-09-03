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

    @Column(name="profile_image_url")
    private String profileImageUrl;

    @Column(name="banner_image_url")
    private String bannerImageUrl;

    public Profile() {

    }
    public Profile(Long id, User user, @Email String email, String profileImageUrl) {
        this.id = id;
        this.user = user;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
