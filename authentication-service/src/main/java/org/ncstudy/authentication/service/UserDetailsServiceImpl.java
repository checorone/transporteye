package org.ncstudy.authentication.service;

import org.ncstudy.authentication.model.RoleDao;
import org.ncstudy.authentication.model.UserDao;
import org.ncstudy.authentication.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDetailsServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserDao userDao = userRepository.findByUsername(s);
        if (userDao == null)
            throw new UsernameNotFoundException(String.format("The username %s does not exist", s));
        List<GrantedAuthority> authorities = new ArrayList<>();
        userDao.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRoleName())));
        return new User(userDao.getUsername(), userDao.getPassword(), authorities);
    }

    public void addUser(UserDao userDao) throws Exception {
        if (userRepository.existsByEmail(userDao.getEmail()))
            throw new Exception("User with this email already exist");
        if (userRepository.existsByUsername(userDao.getUsername()))
            throw new Exception("User with this name already exist");
        userDao.setRoles(Collections.singletonList(RoleDao.USER));
        userDao.setPassword(passwordEncoder.encode(userDao.getPassword()));
        userRepository.save(userDao);
    }

    public void activateUser(UUID uuid) throws UserPrincipalNotFoundException {
        UserDao userDao = userRepository.findByActivationCode(uuid);
        if (userDao == null)
            throw new UserPrincipalNotFoundException("User by activation code not found");
        userDao.setActive(true);
        userDao.setActivationCode(null);
        userRepository.save(userDao);
    }

    public void setRoles(String username, List<RoleDao> roles) {
        UserDao userDao = userRepository.findByUsername(username);
        if (userDao == null)
            throw new UsernameNotFoundException(String.format("The username %s doesn't exist", username));
        userDao.setRoles(roles);
        userRepository.save(userDao);
    }

    @PostConstruct
    private void setupDefaultUsers() {
        if (userRepository.count() == 0) {
            userRepository.save(new UserDao(
                    "john.doe",
                    passwordEncoder.encode("userpass"),
                    Collections.singletonList(RoleDao.USER),
                    true,
                    null));
            userRepository.save(new UserDao(
                    "john.admindoe",
                    passwordEncoder.encode("adminpass"),
                    // todo: check is java > 9 in docker
                    List.of(RoleDao.USER, RoleDao.ADMIN),
                    true,
                    null));
        }
    }


}
