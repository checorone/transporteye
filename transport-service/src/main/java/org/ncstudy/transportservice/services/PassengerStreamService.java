package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.PassengerStream;
import org.ncstudy.transportservice.repository.PassengerStreamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PassengerStreamService {
    @Autowired
    private PassengerStreamRepository passengerStreamRepository;


    public List<PassengerStream> getAllPassengerStreams() {
        ArrayList<PassengerStream> list = new ArrayList<PassengerStream>();
        for (PassengerStream ps : passengerStreamRepository.findAll()) {
            list.add(ps);
        }
        return list;
    }

    public void savePassengerStream(PassengerStream ps) {
        passengerStreamRepository.save(ps);
    }

    public void updatePassengerStream(PassengerStream ps) {
        passengerStreamRepository.save(ps);

    }

    public void deletePassengerStream(int id) {
        passengerStreamRepository.deleteById(id);
    }
}
