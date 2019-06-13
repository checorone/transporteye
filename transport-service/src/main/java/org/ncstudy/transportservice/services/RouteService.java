package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.Route;
import org.ncstudy.transportservice.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;


    public List<Route> getAllRoutes() {
        ArrayList<Route> list = new ArrayList<Route>();
        for (Route route : routeRepository.findAll()) {
            list.add(route);
        }
        return list;
    }

    public void saveRoute(Route route){
        routeRepository.save(route);
    }

    public void updateRoute(Route route){
        routeRepository.save(route);

    }

    public void deleteRoute(UUID uuid){
        routeRepository.deleteById(uuid);
    }
}
