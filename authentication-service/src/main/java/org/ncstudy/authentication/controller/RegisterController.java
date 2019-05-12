package org.ncstudy.authentication.controller;

import org.ncstudy.authentication.model.UserData;
import org.ncstudy.authentication.repository.UserRepository;
import org.ncstudy.authentication.service.MailSender;
import org.ncstudy.authentication.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.UUID;


@Controller("/users")
public class RegisterController {

    private final UserDetailsServiceImpl service;
    private final MailSender sender;
    @Autowired
    private UserRepository userRepository;

    public RegisterController(UserDetailsServiceImpl service, MailSender sender) {
        this.service = service;
        this.sender = sender;
    }

    @PostMapping("/register")
    public String register(@Valid UserData userData) throws Exception {
        userData.setActivationCode(UUID.randomUUID());
        service.addUser(userData);
        sender.send(userData.getEmail(), "TransportEye Activation", "Link for activation: http://localhost:8901/users/activation/" + userData.getActivationCode());
        return "Register message was sent";
    }

    @GetMapping("/activation/{uuid}")
    public String activation(@PathVariable UUID uuid) throws UserPrincipalNotFoundException {
        service.activateUser(uuid);
        return "/login";
    }

    // in process
//    @RequestMapping("/password/recovery")
//    public void recovery(@RequestParam String username){
//        UserData userData = userRepository.findByUsername(username);
//        userData.setActivationCode(UUID.randomUUID());
//        userRepository.save(userData);
//        sender.send(userData.getEmail(), "TransportEye Change Password", "Link to change password: http://localhost:8901/users/password/change/" + userData.getActivationCode());
//    }

}
