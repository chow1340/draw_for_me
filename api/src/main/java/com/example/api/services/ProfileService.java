package com.example.api.services;

import com.example.api.entities.Profile;
import com.example.api.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    ProfileRepository profileRepository;

    public Profile getProfileByUserId(Long id){
        Profile profile = profileRepository.findByUserId(id);
        return profile;
    }

    public void updateProfileImageUrl(Long profileId, String profileImageUrl){
        Profile profile = getProfileByUserId(profileId);
        profile.setProfileImageUrl(profileImageUrl);
        profileRepository.save(profile);
    }

    public void updateBannerImageUrl(Long profileId, String bannerImageUrl){
        Profile profile = getProfileByUserId(profileId);
        profile.setBannerImageUrl(bannerImageUrl);
        profileRepository.save(profile);
    }
}
