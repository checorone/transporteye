package org.ncstudy.transportservice.repository;

import org.ncstudy.transportservice.model.UsersTrip;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UsersTripRepository extends CrudRepository<UsersTrip, Integer> {
//    List<UsersTrip> getAllByCardId(String cardId);

    @Query(value = "select * from users_trip natural join transport natural join bus_stop", nativeQuery = true)
    List<Map> getAllByCardId(String cardId);

}
