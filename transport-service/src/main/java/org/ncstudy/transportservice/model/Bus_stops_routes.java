package org.ncstudy.transportservice.model;

import javax.persistence.*;

@Entity
@Table(name = "bus_stops_routes")
public class Bus_stops_routes {
    @Id
    @Column(name = "bus_stops_routes_id", nullable = false)
    private int bus_stops_routes_id;

    @ManyToOne
    @JoinColumn(name = "bus_stop_id", nullable = false)
    private Bus_stop bus_stop;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;

    public Bus_stops_routes() {
    }

    public Bus_stops_routes(int bus_stops_routes_id, Bus_stop bus_stop, Route route) {
        this.bus_stops_routes_id = bus_stops_routes_id;
        this.bus_stop = bus_stop;
        this.route = route;
    }

    public int getBus_stops_routes_id() {
        return bus_stops_routes_id;
    }

    public void setBus_stops_routes_id(int bus_stops_routes_id) {
        this.bus_stops_routes_id = bus_stops_routes_id;
    }

    public Bus_stop getBus_stop() {
        return bus_stop;
    }

    public void setBus_stop(Bus_stop bus_stop) {
        this.bus_stop = bus_stop;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }
}
