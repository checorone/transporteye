package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.Transport;
import org.ncstudy.transportservice.repository.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransportService {
    @Autowired
    private TransportRepository transportRepository;


    public List<Transport> getAllTransports() {
        ArrayList<Transport> list = new ArrayList<Transport>();
        for (Transport transport : transportRepository.findAll()) {
            list.add(transport);
        }
        return list;
    }

    public void saveTransport(Transport transport) {
        transport.setEmptySeats(transport.getSeats());
        transportRepository.save(transport);
    }

    public void updateTransport(Transport transport) {
        transportRepository.save(transport);

    }

    public void deleteTransport(int id) {
        transportRepository.deleteById(id);
    }

    public Transport getTransport(int transportId) {
        return transportRepository.getTransportById(transportId);
    }
}
