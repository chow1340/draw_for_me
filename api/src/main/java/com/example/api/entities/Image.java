package com.example.api.entities;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;

@Entity
@Table(
    name="image"
)
public class Image {
    @Id
    @Column(name="image_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


//    @OneToOne
//    private GalleryImage galleryImage;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="upload_date")
    @DateTimeFormat
    private String date;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String userImageUrl) {
        this.imageUrl = userImageUrl;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
