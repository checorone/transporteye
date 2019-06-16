package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.Validation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ValidationRepository extends CrudRepository<Validation, Integer> {
    long countByBusStopId(int busStopId);
    List<Validation> getValidationByBusStopId(int bysStopId);
    List<Validation> getValidationByCardId(int cardId);
}
