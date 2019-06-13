package org.ncstudy.authentication.repository;

import org.ncstudy.authentication.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface UserRepository extends JpaRepository<UserData, Long> {
    UserData findByCardId(String cardId);
    UserData findByActivationCode(UUID uuid);
    UserData findByResetPasswordCode(UUID uuid);
    boolean existsByCardId(String cardId);
    boolean existsByEmail(String email);
    boolean existsByEmailAndCardIdNot(String email, String cardId);
    void deleteByCardId(String cardId);
}
