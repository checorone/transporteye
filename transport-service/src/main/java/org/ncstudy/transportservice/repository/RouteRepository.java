package org.ncstudy.transportservice.repository;

import org.ncstudy.transportservice.model.Route;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RouteRepository extends CrudRepository<Route, UUID> {
}
