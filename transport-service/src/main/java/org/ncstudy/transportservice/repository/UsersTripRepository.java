package org.ncstudy.transportservice.repository;

import org.ncstudy.transportservice.model.UsersTrip;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersTripRepository extends CrudRepository<UsersTrip, Integer> {
    List<UsersTrip> getAllByCardId(String cardId);
}
