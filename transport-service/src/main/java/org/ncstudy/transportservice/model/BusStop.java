package org.ncstudy.transportservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "bus_stop")
public class BusStop {
    @Id
    @Column(name = "bus_stop_id", nullable = false)
    private int busStopId;

    @Column(name = "bus_stop_name", nullable = false)
    private String busStopName;

    @Column(name = "bus_stop_latitude", nullable = false)
    private float latitude;

    @Column(name = "bus_stop_longitude", nullable = false)
    private float longitude;

    public BusStop() {
    }

    public BusStop(int  busStopId, String busStopName, float latitude, float longitude) {
        this.setBusStopId(busStopId);
        this.setBusStopName(busStopName);
        this.setLatitude(latitude);
        this.setLongitude(longitude);
    }

	public int getBusStopId() {
		return busStopId;
	}

	public void setBusStopId(int busStopId) {
		this.busStopId = busStopId;
	}

	public String getBusStopName() {
		return busStopName;
	}

	public void setBusStopName(String busStopName) {
		this.busStopName = busStopName;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
}
