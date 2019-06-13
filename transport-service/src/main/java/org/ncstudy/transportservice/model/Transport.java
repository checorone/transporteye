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

    @Column(name = "transport_number", nullable = false)
	private String transport_number;

	@Column(name = "transport_type", nullable = false)
	private String transport_type;

    @Column(name = "transport_latitude", nullable = false)
	private String transport_latitude;

    @Column(name = "transport_longitude", nullable = false)
	private String transport_longitude;
    
    @Column(name = "transport_capacity", nullable = false)
	private String transport_capacity;

	public int getTransport_id() {
		return transport_id;
	}

	public void setTransport_id(int transport_id) {
		this.transport_id = transport_id;
	}

	public String getTransport_number() {
		return transport_number;
	}

	public void setTransport_number(String transport_number) {
		this.transport_number = transport_number;
	}

	public String getTransport_type() {
		return transport_type;
	}

	public void setTransport_type(String transport_type) {
		this.transport_type = transport_type;
	}

	public String getTransport_latitude() {
		return transport_latitude;
	}

	public void setTransport_latitude(String transport_latitude) {
		this.transport_latitude = transport_latitude;
	}

	public String getTransport_longitude() {
		return transport_longitude;
	}

	public void setTransport_longitude(String transport_longitude) {
		this.transport_longitude = transport_longitude;
	}

	public String getTransport_capacity() {
		return transport_capacity;
	}

	public void setTransport_capacity(String transport_capacity) {
		this.transport_capacity = transport_capacity;
	}
}
