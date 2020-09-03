package com.example.api.controllers;

import com.example.api.services.AmazonClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/storage")
public class S3Controller {
    private AmazonClientService amazonClient;

    @Autowired
    S3Controller(AmazonClientService amazonClient) {
        this.amazonClient = amazonClient;
    }

    @PostMapping("/uploadFile")
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return this.amazonClient.uploadFile(file);
    }

    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestPart(value="url") String fileUrl){
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }


}
