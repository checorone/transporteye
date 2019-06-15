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
    private int cardId;

    @Column(name = "password", nullable = false)
    private String password;

    public Card() {
    }

    public Card(int cardId, String password) {
        this.setCardId(cardId);
        this.password = password;
    }

   
    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }

	public int getCardId() {
		return cardId;
	}

	public void setCardId(int cardId) {
		this.cardId = cardId;
	}
}
