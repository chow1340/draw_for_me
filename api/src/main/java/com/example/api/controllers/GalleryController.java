package com.example.api.controllers;

import com.example.api.entities.GalleryImage;
import com.example.api.entities.Image;
import com.example.api.payloads.profile.requests.GetGalleryImagesRequest;
import com.example.api.payloads.profile.requests.UploadGalleryImageRequest;
import com.example.api.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@Controller
@RequestMapping("/api/userImage")
public class GalleryController {
    @Autowired
    ImageService imageService;



    @RequestMapping(value="/loadGalleryImages", method=RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<?> loadGalleryImages(GetGalleryImagesRequest getGalleryImagesRequest){
        if(getGalleryImagesRequest.getUserId() == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        List<GalleryImage> imageList = imageService.getGalleryImageByIdAndOffset(
                Long.valueOf(getGalleryImagesRequest.getUserId()),
                Integer.parseInt(getGalleryImagesRequest.getOffset()), Integer.parseInt(getGalleryImagesRequest.getLimit()));
        return new ResponseEntity<>(imageList, HttpStatus.OK);
    }

    @PostMapping("/uploadGalleryImage")
    public ResponseEntity<?> uploadGalleryImage(@ModelAttribute UploadGalleryImageRequest request) throws URISyntaxException {
        if(request.getFile() == null){
            return new ResponseEntity<String>("Image not found", HttpStatus.BAD_REQUEST);
        }
        imageService.uploadGalleryImage(request);
        return new ResponseEntity<String>("Profile has been updated", HttpStatus.OK);
    }
}
