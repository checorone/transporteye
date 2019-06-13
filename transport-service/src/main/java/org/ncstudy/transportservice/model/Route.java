package org.ncstudy.transportservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "route")
public class Route {
    @Id
    @Column(name = "route_id", nullable = false)
    private int route_id;

    @Column(name = "route_number", nullable = false)
    private String route_number;

    public Route() {
    }

    public Route(int route_id, String route_number) {
        this.route_id = route_id;
        this.route_number = route_number;
    }

    public int getRoute_id() {
        return route_id;
    }

    public void setRoute_id(int route_id) {
        this.route_id = route_id;
    }

    public String getRoute_number() {
        return route_number;
    }

    public void setRoute_number(String route_number) {
        this.route_number = route_number;
    }
}
