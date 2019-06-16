package org.ncstudy.transportservice.model;

import javax.persistence.*;

@Entity
@Table(name = "route")
public class Route {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "route_id", nullable = false)
    private int routeId;

    @Column(name = "route_number", nullable = false)
    private String routeNumber;
    
    @Column(name = "bus_stop_list", nullable = false)
    private String busStopList;

	public int getRouteId() {
		return routeId;
	}

	public void setRouteId(int routeId) {
		this.routeId = routeId;
	}

	public String getRouteNumber() {
		return routeNumber;
	}

	public void setRouteNumber(String routeNumber) {
		this.routeNumber = routeNumber;
	}

	public String getBusStopList() {
		return busStopList;
	}

	public void setBusStopList(String busStopList) {
		this.busStopList = busStopList;
	}
    
}
