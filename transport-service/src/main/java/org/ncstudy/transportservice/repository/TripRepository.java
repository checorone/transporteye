package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.Trip;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends CrudRepository<Trip, Integer> {

    long countByRouteId(int routeId);

    List<Trip> getTripByRouteId(int routeId);

    List<Trip> getTripByTransportId(int transportId);
}
