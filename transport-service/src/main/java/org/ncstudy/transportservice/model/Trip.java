package org.ncstudy.transportservice.model;

import javax.persistence.*;

@Entity
@Table(name = "trip")
public class Trip {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trip_id", nullable = false)
    private int tripId;

    @Column(name = "route_id", nullable = false)
    private int routeId;
    
    @Column(name = "transport_id", nullable = false)
    private int transportId;

	public int getTripId() {
		return tripId;
	}

	public void setTripId(int tripId) {
		this.tripId = tripId;
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

