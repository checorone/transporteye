package org.ncstudy.transportservice.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "validation")
public class Validation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "validation_id", nullable = false)
    private int id;

    @Column(nullable = false)
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(name = "bus_stop_id", nullable = false)
    private int busStopId;

    @Column(name = "card_id", nullable = false)
    private String cardId;

    @Column(name = "transport_id", nullable = false)
    private int transportId;

    @Column
    private Integer routeId;

    public int getTransportId() {
        return transportId;
    }

    public void setTransportId(int transportId) {
        this.transportId = transportId;
    }

    public int getValidationId() {
        return id;
    }

    public void setValidationId(int validationId) {
        this.id = validationId;
    }

    public int getBusStopId() {
        return busStopId;
    }

    public void setBusStopId(int busStopId) {
        this.busStopId = busStopId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getRouteId() {
        return routeId;
    }

    public void setRouteId(Integer routeId) {
        this.routeId = routeId;
    }
}
