package org.ncstudy.transportservice.controllers;

import org.ncstudy.transportservice.model.UsersTrip;
import org.ncstudy.transportservice.services.UsersTripService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController("api/v1/data/trip")
public class TripsController {
    private final UsersTripService service;

    public TripsController(UsersTripService service) {
        this.service = service;
    }

    @GetMapping
    public List<UsersTrip> getAllUsersTrips(Principal card) {
        return service.getAllTripsByCardId(card.getName());
    }
}
