package org.ncstudy.authentication.repository;

import org.ncstudy.authentication.model.PasswordResetLinks;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ResetLinksRepo extends CrudRepository<PasswordResetLinks, Long> {
    PasswordResetLinks findByUserId(Long id);
    PasswordResetLinks findByUuid(UUID uuid);
}
