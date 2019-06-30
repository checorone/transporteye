package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.BusStop;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BusStopRepository extends CrudRepository<BusStop, Integer> {
    List<BusStop> findByIdIn(List<Integer> ids);
}
