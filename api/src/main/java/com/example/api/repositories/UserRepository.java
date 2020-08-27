package com.example.api.repositories;

import com.example.api.entities.User;
import com.example.api.helpers.UserSpecifications;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.swing.text.html.parser.Entity;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor {
    @Query(value = "SELECT * FROM User u WHERE u.email = ?2 ", nativeQuery = true)
    List<User> findByColumn(String column, String email);

}