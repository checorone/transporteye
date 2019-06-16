package org.ncstudy.transportservice.controllers;

import org.ncstudy.transportservice.model.Transport;
import org.ncstudy.transportservice.services.TransportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransportController {
    @Autowired
    private TransportService transportService;
    private static final Logger logger = LoggerFactory.getLogger(TransportController.class);


    @RequestMapping(value="api/v1/transport",method = RequestMethod.GET)
    public List<Transport> getAllTransports() {
        logger.debug("Looking up data for transports...");
        List<Transport> list = transportService.getAllTransports();
        logger.debug("Found {} transport entries.", list.size());
        return list;
    }

    @RequestMapping(value="api/v1/transport",method = RequestMethod.POST)
    public void saveTransport(@RequestBody Transport transport) {
        transportService.saveTransport(transport);
    }

    @RequestMapping(value="api/v1/transport",method = RequestMethod.PUT)
    public void updateTransport(@RequestBody Transport transport) {
        transportService.updateTransport(transport);

    }

    @RequestMapping(value="api/v1/transport/{transportId}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransport( @PathVariable("transportId") int transportId) {
        transportService.deleteTransport( transportId );
    }
}
