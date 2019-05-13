package org.ncstudy.authentication.controller;

import org.ncstudy.authentication.model.Role;
import org.ncstudy.authentication.service.UserDetailsServiceImpl;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@EnableResourceServer
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserDetailsServiceImpl service;

    public AdminController(UserDetailsServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/modify/roles")
    public void changeRoles(@RequestParam String username, @RequestParam List<Role> roles) {
        service.setRoles(username, roles);
    }
}
