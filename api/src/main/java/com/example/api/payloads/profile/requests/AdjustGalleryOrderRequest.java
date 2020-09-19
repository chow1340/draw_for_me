package com.example.api.payloads.profile.requests;

public class AdjustGalleryOrderRequest {

    private String galleryId;
    private String newOrder;

    public String getGalleryId() {
        return galleryId;
    }

    public void setGalleryId(String galleryId) {
        this.galleryId = galleryId;
    }

    public String getNewOrder() {
        return newOrder;
    }

    public void setNewOrder(String newOrder) {
        this.newOrder = newOrder;
    }
}
