package org.ncstudy.transportservice.repository;

import org.ncstudy.transportservice.model.UsersTrip;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UsersTripRepository extends CrudRepository<UsersTrip, Integer> {

    @Query(value = "select * from users_trip natural left join transport natural left " +
            "join bus_stop natural left join route where card_id=:card_id", nativeQuery = true)
    List<Map> getAllByCardId(@Param("card_id") String cardId);
}
