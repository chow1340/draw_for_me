package com.example.api.repositories;

import com.example.api.entities.Role;
import com.example.api.enumerations.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleEnum role);
}
