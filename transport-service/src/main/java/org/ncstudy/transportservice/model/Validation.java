package org.ncstudy.transportservice.model;

import javax.persistence.*;

@Entity
@Table(name = "validation")
public class Validation {
    @Id
    @Column(name = "validation_id", nullable = false)
    private int validation_id;

    @ManyToOne
    @JoinColumn(name = "bus_stop_id", nullable = false)
    private Bus_stop bus_stop;

    //    @ManyToOne todo: check alternative (card in authServer now)
//    @JoinColumn(name = "card_id", nullable = false)
//    private Card card;
    @Column(name = "card_id")
    private String cardId;

    /*@Column(name = "bus_stop_id", nullable = false)
    private String bus_stop_id;

    @Column(name = "card_id", nullable = false)
    private String card_id;*/

    public Validation() {
    }

    public Validation(int validation, Bus_stop bus_stop,
//                      Card card) {
                      String cardId) {
        this.validation_id = validation;
        this.bus_stop = bus_stop;
        this.cardId = cardId;
//        this.card = card;
    }

    public int getValidation() {
        return validation_id;
    }

    public void setValidation(int validation) {
        this.validation_id = validation;
    }

    public Bus_stop getBus_stop() {
        return bus_stop;
    }

    public void setBus_stop(Bus_stop bus_stop) {
        this.bus_stop = bus_stop;
    }

//    public Card getCard() {
//        return card;
//    }

    //    public void setCard(Card card) {
//        this.card = card;
//    }


    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }
}
