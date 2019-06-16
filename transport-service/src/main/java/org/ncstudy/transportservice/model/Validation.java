package org.ncstudy.transportservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "validation")
public class Validation {
    @Id
    @Column(name = "validation_id", nullable = false)
    private int validationId;

    @Column(name = "bus_stop_id", nullable = false)
    private int busStopId;

    @Column(name = "card_id", nullable = false)
    private int cardId;

	public int getValidationId() {
		return validationId;
	}

	public void setValidationId(int validationId) {
		this.validationId = validationId;
	}

	public int getBusStopId() {
		return busStopId;
	}

	public void setBusStopId(int busStopId) {
		this.busStopId = busStopId;
	}

	public int getCardId() {
		return cardId;
	}

	public void setCardId(int cardId) {
		this.cardId = cardId;
	}


}
