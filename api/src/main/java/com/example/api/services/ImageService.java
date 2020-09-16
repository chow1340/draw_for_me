package com.example.api.services;

import com.example.api.entities.GalleryImage;
import com.example.api.entities.Image;
import com.example.api.entities.Profile;
import com.example.api.payloads.profile.requests.UploadGalleryImageRequest;
import com.example.api.repositories.GalleryImageRepository;
import com.example.api.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {
    @Autowired
    AmazonClientService amazonClientService;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    GalleryImageRepository galleryImageRepository;

    @Autowired
    ProfileService profileService;

    @Autowired
    UserService userService;

    public List<Image> getImagesByIdAndOffset(Long userId, int offset, int limit){
        List<Image> res = imageRepository.findByIdWithOffset(userId, offset, limit);
        return res;
    }

    public List<GalleryImage> getGalleryImageByIdAndOffset(Long userId, int offset, int limit){
        List<GalleryImage> res = galleryImageRepository.findAllByIdWithOffset(userId, offset, limit);
        return res;
    }
    public void uploadGalleryImage(UploadGalleryImageRequest request) {
        String imageUrl = amazonClientService.uploadFile(request.getFile());
        if(imageUrl.length() > 0) {
            Long userId = userService.getCurrentUserId();
            Profile profile = profileService.getProfileByUserId(userId);

            //Save to user image
            Image image = new Image();
            image.setImageUrl(imageUrl);
            image.setDate(request.getDate());
            Image newImage = imageRepository.save(image);

            Integer nextAvailableOrderNumber = galleryImageRepository.findNextAvailableOrder(userId);
            if(nextAvailableOrderNumber == null) {
                nextAvailableOrderNumber = 0;
            }

            //Save gallery settings
            GalleryImage galleryImage = new GalleryImage();
            galleryImage.setImage(newImage);
            galleryImage.setProfile(profile);
            galleryImage.setAspectRatioHeight(Integer.valueOf(request.getAspectRatioHeight()));
            galleryImage.setAspectRatioWidth(Integer.valueOf(request.getAspectRatioWidth()));
            galleryImage.setImageOrder(nextAvailableOrderNumber);
            galleryImageRepository.save(galleryImage);
        }
    }
}
