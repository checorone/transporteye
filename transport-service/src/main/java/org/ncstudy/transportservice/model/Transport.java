package org.ncstudy.transportservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transport")
public class Transport {
    @Id
    @Column(name = "transport_id", nullable = false)
	private int transport_id;

    @Column(name = "name", nullable = false)
	private String name;

    @Column(name = "latitude", nullable = false)
	private String latitude;

    @Column(name = "longitude", nullable = false)
	private String longitude;
    
    @Column(name = "workload", nullable = false)
	private int workload;

	public int getTransport_id() {
		return transport_id;
	}

	public void setTransport_id(int transport_id) {
		this.transport_id = transport_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public int getWorkload() {
		return workload;
	}

	public void setWorkload(int workload) {
		this.workload = workload;
	}
}
