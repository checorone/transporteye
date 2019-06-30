package org.ncstudy.transportservice.repository;

import org.ncstudy.transportservice.model.Transport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportRepository extends CrudRepository<Transport, Integer> {
    Transport getTransportById(int transportId);
}
