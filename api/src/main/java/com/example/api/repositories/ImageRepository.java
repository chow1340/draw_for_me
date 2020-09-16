package com.example.api.repositories;

import com.example.api.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,Long> {

    @Query(value="Select * FROM image u WHERE u.user_id = ?1 ORDER BY u.upload_date ASC LIMIT ?3 OFFSET ?2", nativeQuery = true)
    public List<Image> findByIdWithOffset(Long id, int offset, int limit);
}

//    ORDER BY u.upload_date offset ?2 limit ?3