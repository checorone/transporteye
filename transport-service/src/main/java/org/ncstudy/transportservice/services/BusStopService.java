package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.BusStop;
import org.ncstudy.transportservice.repository.BusStopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusStopService {
    @Autowired
    private BusStopRepository busStopRepository;


    public List<BusStop> getAllBusStops() {
        ArrayList<BusStop> list = new ArrayList<BusStop>();
        for (BusStop busStop : busStopRepository.findAll()) {
            list.add(busStop);
        }
        return list;
    }

    public List<BusStop> getBusStopsByIds(List<Integer> ids) {
        return busStopRepository.findByIdIn(ids);
    }

    public BusStop getBusStopById(int busStopId) {
        return busStopRepository.findById(busStopId).get();
    }

    public void saveBusStop(BusStop busStop) {
        busStopRepository.save(busStop);
    }

    public void updateBusStop(BusStop busStop) {
        busStopRepository.save(busStop);

    }

    public void deleteBusStop(int id) {
        busStopRepository.deleteById(id);
    }
}
