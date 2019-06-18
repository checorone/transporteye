package org.ncstudy.transportservice.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "bus_stop")
public class BusStop {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "bus_stop_id", nullable = false)
    private int id;

    @Column(name = "bus_stop_name", nullable = false)
    private String name;

    @Column(name = "bus_stop_latitude", nullable = false)
    private float latitude;

    @Column(name = "bus_stop_longitude", nullable = false)
    private float longitude;

	@OneToMany(mappedBy = "busStop")
	private Set<UsersTrip> trip;

    public BusStop() {
    }

    public BusStop(int id, String name, float latitude, float longitude) {
        this.setId(id);
        this.setName(name);
        this.setLatitude(latitude);
        this.setLongitude(longitude);
    }

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
}
