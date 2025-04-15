package com.gijun.backend.common.repository;

import com.gijun.backend.common.model.Role;
import com.gijun.backend.common.model.User;
import com.gijun.backend.common.model.id.UserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, UserId> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
    boolean existsByEmail(String email);
}
