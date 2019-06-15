package org.ncstudy.transportservice.controllers;


import org.ncstudy.transportservice.services.AnalyticsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="api/v1/analytics")
public class AnalyticsServiceController {
	@Autowired
    private AnalyticsService analyticsService;
    private static final Logger logger = LoggerFactory.getLogger(TransportServiceController.class);

	@RequestMapping(value="/tickets/all",method = RequestMethod.GET)
    public int getAllActivatedTickets() {
        logger.debug("Looking up data for passengers...");
        int tickets = analyticsService.getAllValidationsCount();
        logger.debug("Found {} activated tickets.", tickets);
        return tickets;
    }
	
	@RequestMapping(value="/passengers/free/{busStopId}",method = RequestMethod.GET)
    public int getFreeRiders(@PathVariable("busStopId") int busStopID) {
        logger.debug("Looking up data for passengers...");
        int fr = analyticsService.getAllPassengersWithoutTicketOnStop(busStopID);
        logger.debug("Found {} free riders.", fr);
        return fr;
    }
	
	@RequestMapping(value="/passengers/ontrip/{busStopId}",method = RequestMethod.GET)
    public int getOnBoardPassengersOnStation(@PathVariable("busStopId") int busStopId) {
        logger.debug("Looking up data for passengers...");
        int fr = analyticsService.getLastOnboardPassengersOnStop(busStopId);
        logger.debug("Found {} free riders.", fr);
        return fr;
    }
	
	@RequestMapping(value="/passengers/ontrip",method = RequestMethod.GET)
    public int getPassengersOnTrip() {
        logger.debug("Looking up data for passengers...");
        int p = analyticsService.getAllPassengersOnTrip();
        logger.debug("Found {} passengers with tickets.", p);
        return p;
    }
	
	@RequestMapping(value="/seats/empty",method = RequestMethod.GET)
    public int getEmptySeatsCount() {
        logger.debug("Looking up data for passengers...");
        int seats = analyticsService.getAllEmptySeats();
        logger.debug("Found {} empty seats.", seats);
        return seats;
    }
	
	@RequestMapping(value="/seats/all",method = RequestMethod.GET)
    public int getAllSeatsCount() {
        logger.debug("Looking up data for passengers...");
        int seats = analyticsService.getAllSeats();
        logger.debug("Found {}  seats.", seats);
        return seats;
    }
	
	@RequestMapping(value="/transport/all",method = RequestMethod.GET)
    public int getAllTransports() {
        logger.debug("Looking up data for transports...");
        int tr = analyticsService.getTransportCount();
        logger.debug("Found {} activated tickets.", tr);
        return tr;
    }
	
	@RequestMapping(value="/transport/ontrip",method = RequestMethod.GET)
    public int getTransportOnTrip() {
        logger.debug("Looking up data for transports...");
        int tr = analyticsService.getTransportCountOnTrip();
        logger.debug("Found {} activated tickets.", tr);
        return tr;
    }

}
