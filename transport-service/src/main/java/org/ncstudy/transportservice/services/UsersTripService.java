package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.UsersTrip;
import org.ncstudy.transportservice.repository.UsersTripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersTripService {
    private final UsersTripRepository usersTripRepository;

    public UsersTripService(UsersTripRepository usersTripRepository) {
        this.usersTripRepository = usersTripRepository;
    }

    public List<UsersTrip> getAllTripsByCardId(String cardId){
        return usersTripRepository.getAllByCardId(cardId);
    }
}
