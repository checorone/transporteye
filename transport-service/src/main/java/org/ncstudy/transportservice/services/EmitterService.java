package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.Transport;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class EmitterService {
    private List<SseEmitter> transportEmitters = Collections.synchronizedList(new ArrayList<>());

    public SseEmitter addTransportEmitter() {
        SseEmitter emitter = new SseEmitter(2 * 60 * 60 * 1000L);
        transportEmitters.add(emitter);
        return emitter;
    }

    public void sendTransportEvent(Transport transport) {
        List<SseEmitter> deadEmitters = new ArrayList<>();
        transportEmitters.forEach((sseEmitter -> {
            try {
                sseEmitter.send(transport, MediaType.APPLICATION_JSON);
            } catch (IOException e) {
                deadEmitters.add(sseEmitter);
            }
        }));
        deadEmitters.forEach(ResponseBodyEmitter::complete);
        transportEmitters.removeAll(deadEmitters);
    }
}
