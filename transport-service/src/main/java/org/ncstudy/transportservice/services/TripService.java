package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.Bus_stops_routes;
import org.ncstudy.transportservice.model.Trip;
import org.ncstudy.transportservice.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;

    public List<Trip> getAllTrips() {
        ArrayList<Trip> list = new ArrayList<Trip>();
        for (Trip trip : tripRepository.findAll()) {
            list.add(trip);
        }
        return list;
    }

    public void saveTrip(Trip trip){
        tripRepository.save(trip);
    }

    public void updateTrip(Trip trip){
        tripRepository.save(trip);

    }

    public void deleteTrip(UUID uuid){
        tripRepository.deleteById(uuid);
    }
}
