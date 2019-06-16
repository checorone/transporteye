package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.Validation;
import org.ncstudy.transportservice.repository.ValidationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ValidationService {
    @Autowired
    private ValidationRepository validationRepository;


    public List<Validation> getAllValidations() {
        ArrayList<Validation> list = new ArrayList<Validation>();
        for (Validation validation : validationRepository.findAll()) {
            list.add(validation);
        }
        return list;
    }

    public void saveValidation(Validation validation){
        validationRepository.save(validation);
    }

    public void updateValidation(Validation validation){
        validationRepository.save(validation);

    }

    public void deleteValidation(int id){
        validationRepository.deleteById(id);
    }
}
