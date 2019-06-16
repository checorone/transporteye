package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.PassengerStream;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PassengerStreamRepository extends CrudRepository<PassengerStream, Integer> {
    List<PassengerStream> getPassengerStreamByBusStopId(int bysStopId);
    List<PassengerStream> getPassengerStreamByTransportId(int transportId);
}

