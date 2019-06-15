package org.ncstudy.transportservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transport")
public class Transport {
    @Id
    @Column(name = "id", nullable = false)
	private
    int id;

    @Column(name = "name", nullable = false)
	private String name;

    @Column(name = "latitude", nullable = false)
	private String latitude;

    @Column(name = "longitude", nullable = false)
	private String longitude;
    
    @Column(name = "seats", nullable = false)
	private int seats;
    

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public int getSeats() {
		return seats;
	}

	public void setSeats(int seats) {
		this.seats = seats;
	}
}
