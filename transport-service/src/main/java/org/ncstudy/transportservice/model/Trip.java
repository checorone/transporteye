package org.ncstudy.transportservice.model;

import javax.persistence.*;

@Entity
@Table(name = "trip")
public class Trip {
    @Id
    @Column(name = "trip_id", nullable = false)
    private int trip_id;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route_id;

    @ManyToOne
    @JoinColumn(name = "transport_id", nullable = false)
    private Transport transport_id;

    public Trip() {
    }

    public Trip(int trip_id, Route route_id, Transport transport_id) {
        this.trip_id = trip_id;
        this.route_id = route_id;
        this.transport_id = transport_id;
    }

    public int getTrip_id() {
        return trip_id;
    }

    public void setTrip_id(int trip_id) {
        this.trip_id = trip_id;
    }

    public Route getRoute_id() {
        return route_id;
    }

    public void setRoute_id(Route route_id) {
        this.route_id = route_id;
    }

    public Transport getTransport_id() {
        return transport_id;
    }

    public void setTransport_id(Transport transport_id) {
        this.transport_id = transport_id;
    }
}
