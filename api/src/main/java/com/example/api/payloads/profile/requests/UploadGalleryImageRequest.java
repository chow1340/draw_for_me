package com.example.api.payloads.profile.requests;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;


public class UploadGalleryImageRequest implements Serializable {

    private String aspectRatioWidth;
    private String aspectRatioHeight;
    private MultipartFile file;
    private String date;


    public MultipartFile getFile() {
        return file;
    }

    public String getAspectRatioWidth() {
        return aspectRatioWidth;
    }

    public void setAspectRatioWidth(String aspectRatioWidth) {
        this.aspectRatioWidth = aspectRatioWidth;
    }

    public String getAspectRatioHeight() {
        return aspectRatioHeight;
    }

    public void setAspectRatioHeight(String aspectRatioHeight) {
        this.aspectRatioHeight = aspectRatioHeight;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
