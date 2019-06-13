DROP TABLE validation;
DROP TABLE trip;
DROP TABLE bus_stops_routes;
DROP TABLE transport;
DROP TABLE card;
DROP TABLE bus_stop;
DROP TABLE route;

CREATE TABLE if not exists transport (
	transport_id            SERIAL 		    UNIQUE PRIMARY KEY NOT NULL,
 	transport_number	    VARCHAR(155) 	UNIQUE NOT NULL,
 	transport_type          VARCHAR(155)    NOT NULL,
 	transport_latitude	    VARCHAR(20)     NOT NULL,
    transport_longitude	    VARCHAR(20)     NOT NULL,
    transport_capacity	    VARCHAR(155)    NOT NULL
);

CREATE TABLE if not exists card (
	card_id 	            INTEGER 	    UNIQUE PRIMARY KEY NOT NULL,
 	password	            VARCHAR(155) 	NOT NULL
);

CREATE TABLE if not exists bus_stop (
	bus_stop_id 	        SERIAL       	UNIQUE PRIMARY KEY NOT NULL,
 	bus_stop_name	        VARCHAR(155) 	NOT NULL,
    bus_stop_latitude		VARCHAR(20)		NOT NULL,
    bus_stop_longitude		VARCHAR(20)		NOT NULL
);

CREATE TABLE if not exists route (
    route_id                SERIAL          UNIQUE PRIMARY KEY NOT NULL,
    route_number            VARCHAR(20)     NOT NULL
);

CREATE TABLE if not exists validation (
    validation_id           SERIAL          UNIQUE PRIMARY KEY NOT NULL,
    bus_stop_id 	        INTEGER 	    NOT NULL,
    card_id 		        INTEGER 	    NOT NULL
);

CREATE TABLE if not exists trip (
    trip_id                 SERIAL          UNIQUE PRIMARY KEY NOT NULL,
    route_id                INTEGER         NOT NULL,
    transport_id            INTEGER         NOT NULL
);

CREATE TABLE if not exists bus_stops_routes (
    bus_stops_routes_id     SERIAL          UNIQUE PRIMARY KEY NOT NULL,
    bus_stop_id             INTEGER         NOT NULL,
    route_id                INTEGER         NOT NULL
);
