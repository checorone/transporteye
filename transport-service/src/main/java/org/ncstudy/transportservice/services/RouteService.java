package org.ncstudy.transportservice.services;

import java.util.ArrayList;
import java.util.List;

import org.ncstudy.transportservice.model.Route;
import org.ncstudy.transportservice.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void deleteRoute(int id){
        routeRepository.deleteById(id);
    }
}
