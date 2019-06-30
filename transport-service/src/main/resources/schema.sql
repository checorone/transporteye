DROP TABLE IF EXISTS transport;
CREATE TABLE if not exists transport
(
    transport_id        SERIAL UNIQUE PRIMARY KEY NOT NULL,
    transport_name      VARCHAR(155)              NOT NULL,
    transport_latitude  FLOAT                     NOT NULL,
    transport_longitude FLOAT                     NOT NULL,
    seats               INTEGER                   NOT NULL
);

DROP TABLE IF EXISTS bus_stop;
CREATE TABLE if not exists bus_stop
(
    bus_stop_id        SERIAL UNIQUE PRIMARY KEY NOT NULL,
    bus_stop_name      VARCHAR(155)              NOT NULL,
    bus_stop_latitude  FLOAT                     NOT NULL,
    bus_stop_longitude FLOAT                     NOT NULL
);

DROP TABLE IF EXISTS validation;
CREATE TABLE if not exists validation
(
    validation_id SERIAL PRIMARY KEY,
    date          TIMESTAMP                 NOT NULL,
    bus_stop_id   INTEGER                   NOT NULL,
    card_id       VARCHAR(16)               NOT NULL,
    transport_id  INTEGER                   NOT NULL,
    route_id      INTEGER                   NOT NULL
);

DROP TABLE IF EXISTS passenger_stream;
CREATE TABLE if not exists passenger_stream
(
    stream_id    SERIAL UNIQUE PRIMARY KEY NOT NULL,
    bus_stop_id  INTEGER                   NOT NULL,
    transport_id INTEGER                   NOT NULL,
    in_count     INTEGER                   NOT NULL,
    out_count    INTEGER                   NOT NULL
);

DROP TABLE IF EXISTS route;
CREATE TABLE if not exists route
(
    route_id      SERIAL UNIQUE PRIMARY KEY NOT NULL,
    route_number  VARCHAR(20)               NOT NULL,
    bus_stop_list VARCHAR(155)              NOT NULL
);

DROP TABLE IF EXISTS bus_stops_routes;
CREATE TABLE if not exists bus_stops_routes
(
    bus_stops_routes_id SERIAL UNIQUE PRIMARY KEY NOT NULL,
    bus_stop_id         INTEGER                   NOT NULL,
    route_id            INTEGER                   NOT NULL
);
