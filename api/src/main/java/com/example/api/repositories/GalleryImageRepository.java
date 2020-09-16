package com.example.api.repositories;

import com.example.api.entities.GalleryImage;
import com.example.api.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {

      @Query(value="Select * FROM gallery_image g WHERE g.user_id = ?1 ORDER BY g.image_order DESC LIMIT ?3 OFFSET ?2", nativeQuery = true)
      public List<GalleryImage> findAllByIdWithOffset(Long id, int offset, int limit);

      @Query(value="SELECT max(image_order) + 1 FROM gallery_image g LEFT JOIN image u ON g.image_id = u.image_id", nativeQuery = true)
      Integer findNextAvailableOrder(Long id);

//    @Query(value="Select * FROM image u WHERE u.user_id = ?1 ORDER BY u.upload_date ASC LIMIT ?3 OFFSET ?2", nativeQuery = true)
//    List<UserImage> findByIdWithOffset(Long id, int offset, int limit);

}
