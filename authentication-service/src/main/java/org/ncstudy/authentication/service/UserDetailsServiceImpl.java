package org.ncstudy.authentication.service;

import org.ncstudy.authentication.exceptions.AuthChangesException;
import org.ncstudy.authentication.model.Role;
import org.ncstudy.authentication.model.UserData;
import org.ncstudy.authentication.repository.UserRepository;
import org.ncstudy.authentication.validation.PasswordCustomValidation;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.*;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDetailsServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String s) {
        UserData userData = userRepository.findByUsername(s);
        if (userData == null)
            throw new UsernameNotFoundException("Пользователь с таким именем не существует");
        List<GrantedAuthority> authorities = new ArrayList<>();
        userData.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRoleName())));
        return new User(userData.getUsername(), userData.getPassword(), authorities);
    }

    public void addUser(UserData userData) throws AuthChangesException {
        if (userRepository.existsByEmail(userData.getEmail()))
            throw new AuthChangesException("Пользователь с таким адресом уже существует");
        if (userRepository.existsByUsername(userData.getUsername()))
            throw new AuthChangesException("Пользователь с таким именем уже существует");
        userData.setRoles(Collections.singletonList(Role.USER));
        userData.setPassword(passwordEncoder.encode(userData.getPassword()));
        userRepository.save(userData);
    }

    public void activateUser(UUID uuid) throws AuthChangesException {
        UserData userData = userRepository.findByActivationCode(uuid);
        if (userData == null)
            throw new AuthChangesException("Ссылка недействительна");
        userData.setActive(true);
        userData.setActivationCode(null);
        userRepository.save(userData);
    }

    public void setRoles(String username, List<Role> roles) throws AuthChangesException {
        UserData userData = userRepository.findByUsername(username);
        if (userData == null)
            throw new AuthChangesException("Пользователь с таким именем не существует");
        userData.setRoles(roles);
        userRepository.save(userData);
    }

    public UserData prepareForRecovery(String username) throws AuthChangesException {
        UserData userData = userRepository.findByUsername(username);
        if (userData == null)
            throw new AuthChangesException("Пользователь с таким именем не существует");
        userData.setResetPasswordCode(UUID.randomUUID());
        userRepository.save(userData);
        return userData;
    }

    @PostConstruct
    private void setupDefaultUsers() {
        if (userRepository.count() == 0) {
            userRepository.save(new UserData(
                    "john.doe",
                    passwordEncoder.encode("userpass"),
                    Collections.singletonList(Role.USER),
                    true,
                    null));
            userRepository.save(new UserData(
                    "john.admindoe",
                    passwordEncoder.encode("adminpass"),
                    Arrays.asList(Role.USER, Role.ADMIN),
                    true,
                    null));
        }
    }


    public void savePassword(UUID uuid, String password) throws AuthChangesException {
        UserData userData = userRepository.findByResetPasswordCode(uuid);
        if (userData == null)
            throw new AuthChangesException("Ссылка не действительна");
        PasswordCustomValidation.checkError(password, userData.getUsername());
        userData.setResetPasswordCode(null);
        userData.setPassword(passwordEncoder.encode(password));
        userRepository.save(userData);
    }

    public void delete(UserData userData) {
        userRepository.delete(userData);
    }
}
