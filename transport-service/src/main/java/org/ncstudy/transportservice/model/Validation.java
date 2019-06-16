package org.ncstudy.transportservice.model;

import javax.persistence.*;

@Entity
@Table(name = "validation")
public class Validation {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "validation_id", nullable = false)
    private int validationId;

    @Column(name = "bus_stop_id", nullable = false)
    private int busStopId;

    @Column(name = "card_id", nullable = false)
    private int cardId;

    @Column(name = "transport_id", nullable = false)
	private int transportId;

	public int getTransportId() {
		return transportId;
	}

	public void setTransportId(int transportId) {
		this.transportId = transportId;
	}

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
