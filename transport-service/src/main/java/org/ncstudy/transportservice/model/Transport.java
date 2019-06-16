package org.ncstudy.transportservice.model;

import javax.persistence.*;

@Entity
@Table(name = "transport")
public class Transport {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transport_id", nullable = false)
	private int id;

    @Column(name = "transport_name", nullable = false)
	private String name;

    @Column(name = "transport_latitude", nullable = false)
	private float latitude;

    @Column(name = "transport_longitude", nullable = false)
	private float longitude;
    
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

	public int getSeats() {
		return seats;
	}

	public void setSeats(int seats) {
		this.seats = seats;
	}
}
