package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.BusStop;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BusStopRepository extends CrudRepository<BusStop, Integer> {
}
