package org.ncstudy.transportservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "passenger_stream")
public class Trip {
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "route_id", nullable = false)
    private int routeId;
    
    @Column(name = "transport_id", nullable = false)
    private int transportId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRouteId() {
		return routeId;
	}

	public void setRouteId(int routeId) {
		this.routeId = routeId;
	}

	public int getTransportId() {
		return transportId;
	}

	public void setTransportId(int transportId) {
		this.transportId = transportId;
	}
}

