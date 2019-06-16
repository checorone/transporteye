package org.ncstudy.transportservice.controllers;


import org.ncstudy.transportservice.model.*;
import org.ncstudy.transportservice.services.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="api/v1")
public class TransportServiceController {
	//TRANSPORT
	@Autowired
    private TransportService transportService;
    private static final Logger logger = LoggerFactory.getLogger(TransportServiceController.class);


	@RequestMapping(value="/transport",method = RequestMethod.GET)
    public List<Transport> getAllTransports() {
        logger.debug("Looking up data for transports...");
        List<Transport> list = transportService.getAllTransports();
        logger.debug("Found {} transport entries.", list.size());
        return list;
    }

    @RequestMapping(value="/transport",method = RequestMethod.POST)
    public void saveTransport(@RequestBody Transport transport) {
       transportService.saveTransport(transport);
    }

    @RequestMapping(value="/transport",method = RequestMethod.PUT)
    public void updateTransport(@RequestBody Transport transport) {
        transportService.saveTransport(transport);

    }

    @RequestMapping(value="/transport/{transportId}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransport( @PathVariable("transportId") int transportId) {
        transportService.deleteTransport( transportId );
    }

    //BUS
    @Autowired
    private BusStopService bus_stopService;

    @RequestMapping(value="/bus_stop",method = RequestMethod.GET)
    public List<BusStop> getAllBus_stops() {
        List<BusStop> list = bus_stopService.getAllBusStops();
        return list;
    }


    @RequestMapping(value="/bus_stop",method = RequestMethod.POST)
    public void saveBus_stop(@RequestBody BusStop bus_stop) {
        bus_stopService.saveBusStop(bus_stop);
    }

    @RequestMapping(value="/bus_stop",method = RequestMethod.PUT)
    public void updateBus_stop(@RequestBody BusStop bus_stop) {
        bus_stopService.saveBusStop(bus_stop);

    }

    @RequestMapping(value="/bus_stop/{bus_stop_id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBus_stop( @PathVariable("bus_stop_id") int bus_stop_id) {
        bus_stopService.deleteBusStop( bus_stop_id );
    }


    //VALIDATION
    @Autowired
    private ValidationService validationService;

    @RequestMapping(value="/validation",method = RequestMethod.GET)
    public List<Validation> getAllValidations() {
        List<Validation> list = validationService.getAllValidations();
        return list;
    }

    @RequestMapping(value="/validation",method = RequestMethod.POST)
    public void saveValidation(@RequestBody Validation validation) {
        validationService.saveValidation(validation);
    }

    @RequestMapping(value="/validation",method = RequestMethod.PUT)
    public void updateValidation(@RequestBody Validation validation) {
        validationService.saveValidation(validation);

    }

    @RequestMapping(value="/validation/{validation_id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteValidation( @PathVariable("validation_id") int bus_stop_id) {
    	validationService.deleteValidation( bus_stop_id );
    }



    //ROUTE
    @Autowired
    private RouteService routeService;

    @RequestMapping(value="/route",method = RequestMethod.GET)
    public List<Route> getAllRoutes() {
        List<Route> list = routeService.getAllRoutes();
        return list;
    }


    @RequestMapping(value="/route",method = RequestMethod.POST)
    public void saveRoute(@RequestBody Route route) {
        routeService.saveRoute(route);
    }

    @RequestMapping(value="/route",method = RequestMethod.PUT)
    public void updateRoute(@RequestBody Route route) {
        routeService.saveRoute(route);
    }

    @RequestMapping(value="/route/{route_id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoute( @PathVariable("route_id") int route_id) {
        routeService.deleteRoute( route_id );
    }
    
    //PassengerStream
    @Autowired
    private PassengerStreamService passengerStreamService;

    @RequestMapping(value="/passengers",method = RequestMethod.GET)
    public List<PassengerStream> getAllPassengersStreams() {
        List<PassengerStream> list = passengerStreamService.getAllPassengerStreams();
        return list;
    }


    @RequestMapping(value="/passengers",method = RequestMethod.POST)
    public void saveStream(@RequestBody PassengerStream stream) {
        passengerStreamService.savePassengerStream(stream);
    }

    @RequestMapping(value="/passengers",method = RequestMethod.PUT)
    public void updateStream(@RequestBody PassengerStream stream) {
        passengerStreamService.savePassengerStream(stream);
    }

    @RequestMapping(value="/passengers/{streamId}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStream( @PathVariable("streamId") int streamId) {
        routeService.deleteRoute( streamId );
    }


}
