package org.ncstudy.transportservice.repository;


import org.ncstudy.transportservice.model.Validation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationRepository extends CrudRepository<Validation, Integer> {
}
