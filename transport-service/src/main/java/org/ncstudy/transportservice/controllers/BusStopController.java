package org.ncstudy.transportservice.controllers;


import org.ncstudy.transportservice.model.BusStop;
import org.ncstudy.transportservice.services.BusStopService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="api/v1/data")
public class BusStopController {
    private static final Logger logger = LoggerFactory.getLogger(BusStopController.class);

    @Autowired
    private BusStopService busStopService;

    @RequestMapping(value="/bus_stop",method = RequestMethod.GET)
    public List<BusStop> getAllBusStops() {
        logger.debug("Looking up data for bus stops...");
        List<BusStop> list = busStopService.getAllBusStops();
        logger.debug("Found {} bus stops entries.", list.size());
        return list;
    }


    @RequestMapping(value="/bus_stop",method = RequestMethod.POST)
    public void saveBusStop(@RequestBody BusStop bus_stop) {
        busStopService.saveBusStop(bus_stop);
    }

    @RequestMapping(value="/bus_stop",method = RequestMethod.PUT)
    public void updateBusStop(@RequestBody BusStop bus_stop) {
        busStopService.updateBusStop(bus_stop);

    }

    @RequestMapping(value="/bus_stop/{bus_stop_id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBusStop( @PathVariable("bus_stop_id") int bus_stop_id) {
        busStopService.deleteBusStop( bus_stop_id );
    }
}
