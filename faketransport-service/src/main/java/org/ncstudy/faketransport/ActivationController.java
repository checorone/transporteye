package org.ncstudy.faketransport;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActivationController {

    private Activators activators;

    public ActivationController(Activators activators) {
        this.activators = activators;
    }

    @PostMapping("bus/on")
    public void onBus() {
        if (activators.getAccessToken() == null) {
            activators.setAccessToken(RequestUtil.prepareAccessToken());
        }
        activators.setRunBuses(true);
    }

    @PostMapping("bus/off")
    public void offBus() {
        activators.setRunBuses(false);
    }
}
