package org.ncstudy.transportservice.controllers;

import org.ncstudy.transportservice.model.Route;
import org.ncstudy.transportservice.services.RouteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RouteController {
    private static final Logger logger = LoggerFactory.getLogger(RouteController.class);

    @Autowired
    private RouteService routeService;

    @RequestMapping(value="api/v1/route",method = RequestMethod.GET)
    public List<Route> getAllRoutes() {
        logger.debug("Looking up data for routes...");
        List<Route> list = routeService.getAllRoutes();
        logger.debug("Found {} route entries.", list.size());
        return list;
    }


    @RequestMapping(value="api/v1/route",method = RequestMethod.POST)
    public void saveRoute(@RequestBody Route route) {
        routeService.saveRoute(route);
    }

    @RequestMapping(value="api/v1/route",method = RequestMethod.PUT)
    public void updateRoute(@RequestBody Route route) {
        routeService.updateRoute(route);
    }

    @RequestMapping(value="api/v1/route/{route_id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoute( @PathVariable("route_id") int route_id) {
        routeService.deleteRoute( route_id );
    }
}
