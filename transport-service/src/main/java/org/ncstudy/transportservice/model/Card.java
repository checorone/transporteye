package org.ncstudy.transportservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "card")
public class Card {
    @Id
    @Column(name = "card_id", nullable = false)
    private int card_id;

    @Column(name = "password", nullable = false)
    private String password;

    public Card() {
    }

    public Card(int card_id, String password) {
        this.card_id = card_id;
        this.password = password;
    }

    public int  getCard_id() {
        return card_id;
    }

    public void setCard_id(int  card_id) {
        this.card_id = card_id;
    }

    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }
}
