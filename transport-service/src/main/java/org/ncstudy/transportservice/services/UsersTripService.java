package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.repository.UsersTripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UsersTripService {
    private final UsersTripRepository usersTripRepository;

    public UsersTripService(UsersTripRepository usersTripRepository) {
        this.usersTripRepository = usersTripRepository;
    }

    public List<Map> getAllTripsByCardId(String cardId) {
        return usersTripRepository.getAllByCardId(cardId);
    }
}
