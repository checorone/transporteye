package org.ncstudy.authentication.controller;

import org.ncstudy.authentication.model.UserDao;
import org.ncstudy.authentication.service.MailSender;
import org.ncstudy.authentication.service.UserDetailsServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.UUID;


@Controller("/users")
public class RegisterController {

    private final UserDetailsServiceImpl service;
    private final MailSender sender;

    public RegisterController(UserDetailsServiceImpl service, MailSender sender) {
        this.service = service;
        this.sender = sender;
    }

    @PostMapping("/register")
    public String register(UserDao userDao) throws Exception {
        userDao.setActivationCode(UUID.randomUUID());
        service.addUser(userDao);
        sender.send(userDao.getEmail(), "TransportEye Activation", "Link for activation: http://localhost:8901/activation/" + userDao.getActivationCode());
        return "Register message was sent";
    }

    @GetMapping("/activation/{uuid}")
    public String activation(@PathVariable UUID uuid) throws UserPrincipalNotFoundException {
        service.activateUser(uuid);
        return "/login";
    }
}
