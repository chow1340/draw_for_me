package com.example.api.controllers;

import com.example.api.entities.Profile;
import com.example.api.payloads.requests.UpdateProfileRequest;
import com.example.api.security.services.UserDetailsImplementation;
import com.example.api.services.AmazonClientService;
import com.example.api.services.ProfileService;
import com.example.api.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/api/profile")
public class ProfileController {
    @Autowired
    AmazonClientService amazonClientService;

    @Autowired
    ProfileService profileService;

    @Autowired
    UserService userService;

    @GetMapping(path="/loggedInUserProfile", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Profile> getLoggedInUserProfile(){
        UserDetailsImplementation userDetails = (UserDetailsImplementation) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Profile profile = profileService.getProfileByUserId(userDetails.getId());
        return new ResponseEntity<Profile>( profile, HttpStatus.OK);
    }

    @GetMapping(path="/getProfileByUsername")
    public ResponseEntity<?> getProfileByUsername(@RequestParam String username){
        Profile profile = profileService.getProfileByUsername(username);
        if(profile == null) {
            return new ResponseEntity<String>("Profile not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Profile>(profile, HttpStatus.OK);
    }

    @PostMapping("/uploadProfilePicture")
    public ResponseEntity<?> uploadProfileImageUrl(@RequestPart(value = "file") MultipartFile file) {
        String imageUrl = amazonClientService.uploadFile(file);
        Long profileId = userService.getCurrentUserId();
        if(profileId == null) {
            return new ResponseEntity<String>("User not found", HttpStatus.BAD_REQUEST);
        }
        if(imageUrl == null) {
            return new ResponseEntity<String>("Image was not uploaded", HttpStatus.BAD_REQUEST);
        }
        profileService.updateProfileImageUrl(Long.valueOf(profileId), imageUrl);
        return new ResponseEntity<String>("Profile picture updated!", HttpStatus.OK);
    }

    @PostMapping("/uploadBannerImage")
    public ResponseEntity<?> uploadBannerImage(@RequestPart("file") MultipartFile file) {
        String imageUrl = amazonClientService.uploadFile(file);
        Long profileId = userService.getCurrentUserId();
        if(profileId == null) {
            return new ResponseEntity<String>("User not found", HttpStatus.BAD_REQUEST);
        }
        if(imageUrl == null) {
            return new ResponseEntity<String>("Image was not uploaded", HttpStatus.BAD_REQUEST);
        }
        profileService.updateBannerImageUrl(Long.valueOf(profileId), imageUrl);
        return new ResponseEntity<String>("Banner picture updated!", HttpStatus.OK);
    }

    @PostMapping("/updateProfileInformation")
    public ResponseEntity<?> updateProfileInformation(@RequestBody UpdateProfileRequest request){
        profileService.saveUpdateProfileRequest(request);
        return new ResponseEntity<String>("Profile has been updated", HttpStatus.OK);
    }
}
