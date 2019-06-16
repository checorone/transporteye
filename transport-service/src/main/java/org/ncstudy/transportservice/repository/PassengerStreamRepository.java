package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.PassengerStream;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerStreamRepository extends CrudRepository<PassengerStream, Integer> {
}

