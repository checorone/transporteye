package org.ncstudy.transportservice.controllers;

import org.ncstudy.transportservice.model.TransportExt;
import org.ncstudy.transportservice.services.AnalyticsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="api/v1/analytics")
public class AnalyticsServiceController {
	@Autowired
    private AnalyticsService analyticsService;
    private static final Logger logger = LoggerFactory.getLogger(AnalyticsServiceController.class);
	
    @RequestMapping(value="/map/transport",method = RequestMethod.GET)
    public List<TransportExt> getMapData() {
        logger.debug("Looking up data for map...");
        List<TransportExt> fr = analyticsService.getMapDataTransport();
        logger.debug("Found {} transport entries.", fr);
        return fr;
    }
    
	@RequestMapping(value="/passengers/free/{busStopId}",method = RequestMethod.GET)
    public double getFreeRiders(@PathVariable("busStopId") int busStopID) {
        logger.debug("Looking up data for passengers...");
        double fr = analyticsService.getAllPassengersWithoutTicketOnStop(busStopID);
        logger.debug("Found {} free riders.", fr);
        return fr;
    }
	
	@RequestMapping(value="/seats/types/all",method = RequestMethod.GET)
    public Map<String, Integer> getAllSeatsType() {
        logger.debug("Looking up data for passengers...");
        Map<String, Integer> fr = analyticsService.getAllSeatsTypesCount();
        logger.debug("Found {} free riders.", fr);
        return fr;
    }
	
	@RequestMapping(value="/transports/types/all",method = RequestMethod.GET)
    public Map<String, Integer> getAllTransportsTypes() {
        logger.debug("Looking up data for passengers...");
        Map<String, Integer> fr = analyticsService.getAllTransportsTypesCount();
        logger.debug("Found {} free riders.", fr);
        return fr;
    }
	
	@RequestMapping(value="/seats/average/all",method = RequestMethod.GET)
    public Map<String, Double> getAverageSeats() {
        logger.debug("Looking up data for passengers...");
        Map<String, Double> fr = analyticsService.getAverageTransportLoad();
        logger.debug("Found {} free riders.", fr);
        return fr;
    }
	
	@RequestMapping(value="/transports/average/all",method = RequestMethod.GET)
    public Map<String, Double> getAverageTransports() {
        logger.debug("Looking up data for passengers...");
        Map<String, Double> fr = analyticsService.getAverageRouteLoad();
        logger.debug("Found {} free riders.", fr);
        return fr;
    }
	
	
	@RequestMapping(value="/passengers/free/all",method = RequestMethod.GET)
    public double getFreeRiders() {
        logger.debug("Looking up data for passengers...");
        Map<String, Integer> fr = analyticsService.getAllPassengerTypesCount();
        logger.debug("Found {} free riders.", fr);
        return fr.get("in") - fr.get("out") - fr.get("validated");
    }
	
	@RequestMapping(value="/passengers/onboard/last/{busStopId}",method = RequestMethod.GET)
    public int getOnBoardPassengersOnStation(@PathVariable("busStopId") int busStopId) {
        logger.debug("Looking up data for passengers...");
        int fr = analyticsService.getLastOnboardPassengersOnStop(busStopId);
        logger.debug("Found {} passengers on trip.", fr);
        return fr;
    }
	
	@RequestMapping(value="/passengers/ontrip",method = RequestMethod.GET)
    public int getPassengersOnTrip() {
        logger.debug("Looking up data for passengers...");
        int p = analyticsService.getAllPassengersOnTrip();
        logger.debug("Found {} passengers with tickets.", p);
        return p;
    }

    @RequestMapping(value="/passengers/onroute/{routeId}",method = RequestMethod.GET)
    public int getAllPassengersOnRoute(@PathVariable("routeId") int routeId) {
        logger.debug("Looking up data for passengers...");
        int p = analyticsService.getAllPassengersOnRoute(routeId);
        logger.debug("Found {} passengers with tickets.", p);
        return p;
    }

    @RequestMapping(value = "/passengers/types/all", method = RequestMethod.GET)
    public Map<String, Integer> getAllPassengerTypesCount(){
        logger.debug("Looking up data for passengers...");
        Map<String, Integer> typesCount = analyticsService.getAllPassengerTypesCount();
        logger.debug("Found {} empty seats.", typesCount.size());
        return typesCount;
    }

    @RequestMapping(value = "/passengers/types/{busStopId}", method = RequestMethod.GET)
    public Map<String, Long> getAllPassengerTypesCount(@PathVariable("busStopId") int busStopId){
        logger.debug("Looking up data for passengers...");
        Map<String, Long> typesCountOnStop = analyticsService.getPassengerTypesCountOnStop(busStopId);
        logger.debug("Found {} empty seats.", typesCountOnStop.size());
        return typesCountOnStop;
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
	
	@RequestMapping(value="/transport/ontrip/all",method = RequestMethod.GET)
    public int getTransportOnTrip() {
        logger.debug("Looking up data for transports...");
        int tr = analyticsService.getTransportCountOnTrip();
        logger.debug("Found {} activated tickets.", tr);
        return tr;
    }

    @RequestMapping(value="/transport/ontrip/{routeId}",method = RequestMethod.GET)
    public double getTransportCountOnRoute(@PathVariable("routeId") int routeId) {
        logger.debug("Looking up data for transports...");
        double countOnRoute = analyticsService.getTransportCountOnRoute(routeId);
        logger.debug("Found {} activated tickets.", countOnRoute);
        return countOnRoute;
    }

    @RequestMapping(value="/transport/empty/{transportId}",method = RequestMethod.GET)
    public double getEmptySeatsOnTransport(@PathVariable("transportId") int transportId) {
        logger.debug("Looking up data for transports...");
        double countOnRoute = analyticsService.getEmptySeatsOnTransport(transportId);
        logger.debug("Found {} activated tickets.", countOnRoute);
        return countOnRoute;
    }
    
	@RequestMapping(value="/validations/all",method = RequestMethod.GET)
    public int getAllActivatedTickets() {
        logger.debug("Looking up data for passengers...");
        int tickets = analyticsService.getAllValidationsCount();
        logger.debug("Found {} activated tickets.", tickets);
        return tickets;
    }

    @RequestMapping(value="/validation/all/{busStopId}",method = RequestMethod.GET)
    public double getAllValidationsCountOnStop(@PathVariable("busStopId") int busStopId) {
        logger.debug("Looking up data for transports...");
        double countOnStop = analyticsService.getAllValidationsCountOnStop(busStopId);
        logger.debug("Found {} activated tickets.", countOnStop);
        return countOnStop;
    }

    @RequestMapping(value="/validation/last/{busStopId}",method = RequestMethod.GET)
    public double getLastValidationsCountOnStop(@PathVariable("busStopId") int busStopId) {
        logger.debug("Looking up data for transports...");
        double countOnStop = analyticsService.getLastValidationsCountOnStop(busStopId);
        logger.debug("Found {} activated tickets.", countOnStop);
        return countOnStop;
    }


}
