package com.example.api.entities;

import javax.persistence.*;

@Entity
@Table(
        name="gallery_image"
)
public class GalleryImage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @OneToOne
    @JoinColumn(name = "image_id")
    private Image image;

    @Column(name="aspect_ratio_width")
    private Integer aspectRatioWidth;

    @Column(name="aspect_ratio_height")
    private Integer aspectRatioHeight;

    @Column(name="image_order")
    private Integer imageOrder;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private Profile profile;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Integer getAspectRatioWidth() {
        return aspectRatioWidth;
    }

    public void setAspectRatioWidth(Integer aspectRatioWidth) {
        this.aspectRatioWidth = aspectRatioWidth;
    }

    public Integer getAspectRatioHeight() {
        return aspectRatioHeight;
    }

    public void setAspectRatioHeight(Integer aspectRatioHeight) {
        this.aspectRatioHeight = aspectRatioHeight;
    }

    public Integer getImageOrder() {
        return imageOrder;
    }

    public void setImageOrder(Integer imageOrder) {
        this.imageOrder = imageOrder;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}
