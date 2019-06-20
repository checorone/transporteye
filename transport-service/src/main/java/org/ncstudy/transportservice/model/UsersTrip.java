package org.ncstudy.transportservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class UsersTrip {

    @Id
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date date;

    @Column(nullable = false)
    private String cardId;

    @Column
    Integer busStopId;

    @Column
    Integer transportId;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "bus_stop_id", referencedColumnName = "bus_stop_id")
//    private BusStop busStop;
//
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "transport_id", referencedColumnName = "transport_id")
//    private Transport transport;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }


//    public BusStop getBusStop() {
//        return busStop;
//    }

//    public void setBusStop(BusStop busStop) {
//        this.busStop = busStop;
//    }

//    public Transport getTransport() {
//        return transport;
//    }
//
//    public void setTransport(Transport transport) {
//        this.transport = transport;
//    }
}
