package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.Trip;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends CrudRepository<Trip, Integer> {
}
