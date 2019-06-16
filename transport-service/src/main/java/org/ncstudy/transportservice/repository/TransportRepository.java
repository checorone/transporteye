package org.ncstudy.transportservice.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import org.ncstudy.transportservice.model.Transport;

@Repository
public interface TransportRepository extends CrudRepository<Transport,Integer>  {
	Transport getTransportByTransportId(int transportId);
}
