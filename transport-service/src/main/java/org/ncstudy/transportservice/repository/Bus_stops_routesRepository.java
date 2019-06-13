package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.Bus_stops_routes;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface Bus_stops_routesRepository extends CrudRepository<Bus_stops_routes, UUID> {
}