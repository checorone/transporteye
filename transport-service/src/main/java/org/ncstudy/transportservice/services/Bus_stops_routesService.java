package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.Bus_stops_routes;
import org.ncstudy.transportservice.repository.Bus_stops_routesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class Bus_stops_routesService {
    @Autowired
    private Bus_stops_routesRepository bus_stops_routesRepository;


    public List<Bus_stops_routes> getAllBus_stops_routes() {
        ArrayList<Bus_stops_routes> list = new ArrayList<Bus_stops_routes>();
        for (Bus_stops_routes bus_stops_routes : bus_stops_routesRepository.findAll()) {
            list.add(bus_stops_routes);
        }
        return list;
    }

    public void saveBus_stops_routes(Bus_stops_routes bus_stops_routes){
        bus_stops_routesRepository.save(bus_stops_routes);
    }

    public void updateBus_stops_routes(Bus_stops_routes bus_stops_routes){
        bus_stops_routesRepository.save(bus_stops_routes);

    }

    public void deleteBus_stops_routes(UUID uuid){
        bus_stops_routesRepository.deleteById(uuid);
    }
}
