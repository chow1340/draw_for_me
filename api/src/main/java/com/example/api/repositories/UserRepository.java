package com.example.api.repositories;
import com.example.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor {
    @Query(value = "SELECT * FROM User u WHERE u.email = ?2 ", nativeQuery = true)
    List<User> findByColumn(String column, String email);

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

}