package org.ncstudy.authentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "app_user")
public class UserData {
    @Id
    @Column(name = "card_id")
    @Pattern(regexp = "^\\d{16}$", message = "Неверный формат номера карты")
    private String cardId;

    @Column(name = "email", unique = true)
    @Email
    private String email;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "active")
    private boolean active;

    @Column(name = "activation_code")
    @JsonIgnore
    private UUID activationCode;

    @Column(name = "reset_code")
    @JsonIgnore
    private UUID resetPasswordCode;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "app_role", joinColumns = @JoinColumn(name = "card_id"))
    @Enumerated(EnumType.STRING)
    private List<Role> roles;

    public UserData() {}

    public UserData(String cardId, String password, List<Role> roles, boolean active, String email) {
        this.cardId = cardId;
        this.password = password;
        this.roles = roles;
        this.active = active;
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
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

    public UUID getResetPasswordCode() {
        return resetPasswordCode;
    }

    public void setResetPasswordCode(UUID resetPasswordCode) {
        this.resetPasswordCode = resetPasswordCode;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }
}
