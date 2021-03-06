package org.ncstudy.authentication.controller;

import org.ncstudy.authentication.exceptions.AuthChangesException;
import org.ncstudy.authentication.model.UserData;
import org.ncstudy.authentication.service.MailSender;
import org.ncstudy.authentication.service.UserDetailsServiceImpl;
import org.ncstudy.authentication.validation.PasswordCustomValidation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/users")
public class UserAuthController {

    private final UserDetailsServiceImpl service;
    private final MailSender sender;

    public UserAuthController(UserDetailsServiceImpl service, MailSender sender) {
        this.service = service;
        this.sender = sender;
    }

    @PostMapping("/register")
    public void register(@Valid UserData userData,
                         @RequestParam String clientLink) throws AuthChangesException {
        PasswordCustomValidation.checkError(userData.getPassword(), userData.getCardId());
        service.addUser(userData);
        try {
            sender.send(userData.getEmail(),
                    "TransportEye Активация аккаунта",
                    "Ссылка для активации: " + clientLink + "/" + userData.getActivationCode());
        } catch (Exception e) {
            service.delete(userData);
            throw new AuthChangesException("Сообщение не было отправлено. Проверьте правильность почты");
        }
    }

    @PutMapping("/activation/{uuid}")
    public void activation(@PathVariable UUID uuid) throws AuthChangesException {
        service.activateUser(uuid);
    }

    @PutMapping("/password/recovery")
    public void recovery(@RequestParam String cardId, @RequestParam String clientLink) throws AuthChangesException {
        UserData data = service.prepareForRecovery(cardId);
        sender.send(data.getEmail(),
                "TransportEye Сброс пароля",
                "Ссылка для изменения пороля: " + clientLink + "/" + data.getResetPasswordCode());
    }

    @PutMapping("/password/change")
    public void savePassword(
            @RequestParam UUID uuid,
            @RequestParam String password) throws AuthChangesException {
        service.savePassword(uuid, password);
    }

    @ExceptionHandler({AuthChangesException.class, UsernameNotFoundException.class})
    public ResponseEntity<String> handle(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
