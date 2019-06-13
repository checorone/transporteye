package org.ncstudy.authentication.controller;

import org.ncstudy.authentication.exceptions.AuthChangesException;
import org.ncstudy.authentication.model.Role;
import org.ncstudy.authentication.service.UserDetailsServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    private final UserDetailsServiceImpl service;

    public AdminController(UserDetailsServiceImpl service) {
        this.service = service;
    }

    @PutMapping("/modify/roles")
    public void changeRoles(@RequestParam String username, @RequestParam List<Role> roles) {
        try {
            service.setRoles(username, roles);
        } catch (AuthChangesException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
