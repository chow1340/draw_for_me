package com.example.api.services;

import com.example.api.entities.Profile;
import com.example.api.payloads.profile.requests.UpdateProfileRequest;
import com.example.api.repositories.ProfileRepository;
import com.example.api.security.services.UserDetailsImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    AmazonClientService amazonClientService;

    public Profile getProfileByUserId(Long id){
        Profile profile = profileRepository.findByUserId(id);
        return profile;
    }

    public Profile getProfileByUsername(String username){
        Profile profile = profileRepository.findByUsername(username);
        return profile;
    }

    public void updateProfileImageUrl(Long profileId, String profileImageUrl){
        Profile profile = getProfileByUserId(profileId);
        if(profile.getProfileImageUrl() != null) {
            amazonClientService.deleteFileFromS3Bucket(profile.getProfileImageUrl());
        }
        profile.setProfileImageUrl(profileImageUrl);
        profileRepository.save(profile);
    }

    public void updateBannerImageUrl(Long profileId, String bannerImageUrl){
        Profile profile = getProfileByUserId(profileId);
        if(profile.getBannerImageUrl() != null) {
            amazonClientService.deleteFileFromS3Bucket(profile.getBannerImageUrl());
        }
        profile.setBannerImageUrl(bannerImageUrl);
        profileRepository.save(profile);
    }

    public void saveUpdateProfileRequest(UpdateProfileRequest request){
        UserDetailsImplementation userDetails = (UserDetailsImplementation) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Profile profile = getProfileByUserId(userDetails.getId());

        profile.setDescription(request.getDescription());
        profileRepository.save(profile);
    }

}
