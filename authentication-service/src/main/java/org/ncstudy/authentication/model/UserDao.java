package org.ncstudy.authentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "app_user")
public class UserDao {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "active")
    private boolean active;

    @Column(name = "activation_code")
    private UUID activationCode;

    @ElementCollection(targetClass = RoleDao.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "app_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private List<RoleDao> roles;

    public UserDao() {
    }

    public UserDao(String username, String password, List<RoleDao> roles, boolean active, String email) {
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.active = active;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<RoleDao> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleDao> roles) {
        this.roles = roles;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UUID getActivationCode() {
        return activationCode;
    }

    public void setActivationCode(UUID activationCode) {
        this.activationCode = activationCode;
    }
}
