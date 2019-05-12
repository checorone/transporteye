package org.ncstudy.authentication.repository;

import org.ncstudy.authentication.model.UserDao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface UserRepository extends JpaRepository<UserDao, Long> {
    UserDao findByUsername(String username);
    UserDao findByActivationCode(UUID uuid);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
