INSERT INTO transport (transport_number, transport_type, transport_latitude, transport_longitude, transport_capacity)
VALUES ('пл324д', 'гармошка', '124.124.124', '412.24.321','25');

INSERT INTO card VALUES (213523,'asfasffas');
INSERT INTO card VALUES (23,'asfasffas');
INSERT INTO card VALUES (364,'asfasffas');

INSERT INTO bus_stop (bus_stop_name, bus_stop_latitude, bus_stop_longitude)
VALUES ('МИР', '11.523.12','324.2351.4');

INSERT INTO bus_stop (bus_stop_name, bus_stop_latitude, bus_stop_longitude)
VALUES ('ТРУД', '115233.12','3234651.4');

INSERT INTO validation (bus_stop_id, card_id)
VALUES (1, 213523);

INSERT INTO validation (bus_stop_id, card_id)
VALUES (1, 23);

INSERT INTO route (route_number)
VALUES ('400э');

INSERT INTO  bus_stops_routes (bus_stop_id, route_id)
VALUES (1,1);
INSERT INTO  bus_stops_routes (bus_stop_id, route_id)
VALUES (2,1);

