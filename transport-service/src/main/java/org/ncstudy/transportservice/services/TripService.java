package org.ncstudy.transportservice.services;

import java.util.ArrayList;
import java.util.List;

import org.ncstudy.transportservice.model.Trip;
import org.ncstudy.transportservice.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void deleteTrip(int id){
    	tripRepository.deleteById(id);
    }

}
