package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.Bus_stops_routes;
import org.ncstudy.transportservice.model.Card;
import org.ncstudy.transportservice.model.Trip;
import org.ncstudy.transportservice.model.Validation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TripRepository extends CrudRepository<Trip, UUID> {
}