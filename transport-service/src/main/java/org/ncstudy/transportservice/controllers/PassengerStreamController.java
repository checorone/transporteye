package org.ncstudy.transportservice.controllers;


import org.ncstudy.transportservice.model.PassengerStream;
import org.ncstudy.transportservice.services.PassengerStreamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/data")
public class PassengerStreamController {
    private static final Logger logger = LoggerFactory.getLogger(PassengerStreamController.class);

    @Autowired
    private PassengerStreamService passengerStreamService;

    @RequestMapping(value = "/passengers", method = RequestMethod.GET)
    public List<PassengerStream> getAllPassengersStreams() {
        logger.debug("Looking up data for passenger stream...");
        List<PassengerStream> list = passengerStreamService.getAllPassengerStreams();
        logger.debug("Found {} passenger stream entries.", list.size());
        return list;
    }


    @RequestMapping(value = "/passengers", method = RequestMethod.POST)
    public void saveStream(@RequestBody PassengerStream stream) {
        passengerStreamService.savePassengerStream(stream);
    }

    @RequestMapping(value = "/passengers", method = RequestMethod.PUT)
    public void updateStream(@RequestBody PassengerStream stream) {
        passengerStreamService.updatePassengerStream(stream);
    }

    @RequestMapping(value = "/passengers/{streamId}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStream(@PathVariable("streamId") int streamId) {
        passengerStreamService.deletePassengerStream(streamId);
    }


}
