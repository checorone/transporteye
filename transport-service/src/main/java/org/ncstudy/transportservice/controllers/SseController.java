package org.ncstudy.transportservice.controllers;

import org.ncstudy.transportservice.services.EmitterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("api/v1/subscribe")
public class SseController {

    private final EmitterService emitterService;

    public SseController(EmitterService emitterService) {
        this.emitterService = emitterService;
    }

    @GetMapping("/transport")
    public SseEmitter transportSse() {
        return emitterService.addTransportEmitter();
    }
}
