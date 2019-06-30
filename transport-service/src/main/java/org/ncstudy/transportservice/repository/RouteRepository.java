package org.ncstudy.transportservice.repository;

import org.ncstudy.transportservice.model.Route;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends CrudRepository<Route, Integer> {
    List<Route> getRouteByRouteId(int routeId);
}
