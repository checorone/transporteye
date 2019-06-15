package org.ncstudy.authentication.controller;

import org.ncstudy.authentication.exceptions.AuthChangesException;
import org.ncstudy.authentication.model.UserData;
import org.ncstudy.authentication.service.UserDetailsServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.constraints.Pattern;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/admin")
@Validated
public class AdminController {

    private final UserDetailsServiceImpl service;

    public AdminController(UserDetailsServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/card/get/all")
    public List getAllUsers(){
        return service.getAll();
    }
    @GetMapping("/card/get/all/id")
    public List getAllUsersId(){
        return service.getAllCardId();
    }

    @DeleteMapping("/card/delete")
    @Transactional
    public void deleteUser(
            @RequestParam("card_id")
            @Pattern(regexp = "^\\d{16}$", message = "Неверный формат номера карты")
                    String cardId) {
        service.delete(cardId);
    }

    @PutMapping("card/update")
    public void updateUser(@RequestParam boolean resetPassword, UserData userData
            ) throws AuthChangesException {
        service.updateUser(userData, resetPassword);
    }

    @ExceptionHandler({AuthChangesException.class, UsernameNotFoundException.class})
    public ResponseEntity<String> handle(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map handle(MethodArgumentNotValidException exception) {
        return error(exception.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.toList()));
    }


    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map handle(ConstraintViolationException exception) {
        return error(exception.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toList()));
    }

    private Map error(Object message) {
        return Collections.singletonMap("error", message);
    }
}
