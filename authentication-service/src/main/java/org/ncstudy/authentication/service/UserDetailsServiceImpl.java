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
        UserData userData = userRepository.findByCardId(s);
        if (userData == null)
            throw new UsernameNotFoundException(AuthChangesException.CARD_NOT_EXIST);
        if (!userData.isActive())
            throw new UsernameNotFoundException(AuthChangesException.USER_NOT_ACTIVE);
        List<GrantedAuthority> authorities = new ArrayList<>();
        userData.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRoleName())));
        return new User(userData.getCardId(), userData.getPassword(), authorities);
    }

    public void addUser(UserData userData) throws AuthChangesException {
        if (userRepository.existsByEmail(userData.getEmail()))
            throw new AuthChangesException(AuthChangesException.EMAIL_ALREADY_USED);
        if (userRepository.existsByCardId(userData.getCardId()))
            throw new AuthChangesException(AuthChangesException.CARD_ALREADY_EXIST);
        userData.setActivationCode(UUID.randomUUID());
        userData.setRoles(Collections.singletonList(Role.USER));
        userData.setPassword(passwordEncoder.encode(userData.getPassword()));
        userRepository.save(userData);
    }

    public void activateUser(UUID uuid) throws AuthChangesException {
        UserData userData = userRepository.findByActivationCode(uuid);
        if (userData == null)
            throw new AuthChangesException(AuthChangesException.BAD_LINK);
        userData.setActive(true);
        userData.setActivationCode(null);
        userRepository.save(userData);
    }

    public void setRoles(String cardId, List<Role> roles) throws AuthChangesException {
        UserData userData = userRepository.findByCardId(cardId);
        if (userData == null)
            throw new AuthChangesException(AuthChangesException.CARD_NOT_EXIST);
        userData.setRoles(roles);
        userRepository.save(userData);
    }

    public UserData prepareForRecovery(String cardId) throws AuthChangesException {
        UserData userData = userRepository.findByCardId(cardId);
        if (userData == null)
            throw new AuthChangesException(AuthChangesException.CARD_NOT_EXIST);
        userData.setResetPasswordCode(UUID.randomUUID());
        userRepository.save(userData);
        return userData;
    }

    @PostConstruct
    private void setupDefaultUsers() {
        if (userRepository.count() == 0) {
            userRepository.save(new UserData(
                    "0000000000000002",
                    passwordEncoder.encode("userpass"),
                    Collections.singletonList(Role.USER),
                    true,
                    "transport_eye_fake@mail.ru"));
            userRepository.save(new UserData(
                    "0000000000000001",
                    passwordEncoder.encode("adminpass"),
                    Arrays.asList(Role.USER, Role.ADMIN),
                    true,
                    "test@mail.ru"));
        }
    }


    public void savePassword(UUID uuid, String password) throws AuthChangesException {
        UserData userData = userRepository.findByResetPasswordCode(uuid);
        if (userData == null)
            throw new AuthChangesException(AuthChangesException.BAD_LINK);
        PasswordCustomValidation.checkError(password, userData.getCardId());
        userData.setResetPasswordCode(null);
        userData.setPassword(passwordEncoder.encode(password));
        userRepository.save(userData);
    }

    public void delete(UserData userData) {
        userRepository.delete(userData);
    }
    public void delete(String cardId) {
        userRepository.deleteByCardId(cardId);
    }
    public List<UserData> getAll(){
        return userRepository.findAll();
    }

    public void updateUser(UserData userData, boolean resetPassword) throws AuthChangesException {
        if (userRepository.existsByEmailAndCardIdNot(userData.getEmail(), userData.getCardId()))
            throw new AuthChangesException(AuthChangesException.EMAIL_ALREADY_USED);
        if (!resetPassword){
            UserData oldData = userRepository.findByCardId(userData.getCardId());
            if (oldData == null)
                throw new AuthChangesException(AuthChangesException.CARD_NOT_EXIST);
            userData.setPassword(oldData.getPassword());
        } else {
            userData.setPassword("x");
        }
        userRepository.save(userData);
    }

    public List<String> getAllCardId(){
        return userRepository.getAllCardId();
    }
}
