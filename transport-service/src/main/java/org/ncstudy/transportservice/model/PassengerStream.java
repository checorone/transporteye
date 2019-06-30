package org.ncstudy.transportservice.model;

import javax.persistence.*;

@Entity
@Table(name = "passenger_stream")
public class PassengerStream {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stream_id", nullable = false)
    private int streamId;

    @Column(name = "bus_stop_id", nullable = false)
    private int busStopId;

    @Column(name = "transport_id", nullable = false)
    private int transportId;

    @Column(name = "in_count", nullable = false)
    private int inCount;

    @Column(name = "out_count", nullable = false)
    private int outCount;

    public int getOutCount() {
        return outCount;
    }

    public void setOutCount(int outCount) {
        this.outCount = outCount;
    }

    public int getInCount() {
        return inCount;
    }

    public void setInCount(int inCount) {
        this.inCount = inCount;
    }

    public int getTransportId() {
        return transportId;
    }

    public void setTransportId(int transportId) {
        this.transportId = transportId;
    }

    public int getBusStopId() {
        return busStopId;
    }

    public void setBusStopId(int busStopId) {
        this.busStopId = busStopId;
    }

    public int getStreamId() {
        return streamId;
    }

    public void setStreamId(int streamId) {
        this.streamId = streamId;
    }

}
