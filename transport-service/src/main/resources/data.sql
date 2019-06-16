INSERT INTO transport (id, name, longitude, latitude, seats)
values (1, 'LIAZ4450', 37.5880909, 55.7550373, 50),
       (2, 'LIAZ4230', 37.62482643, 55.74296051, 40),
       (3, 'LIAZ7250', 37.63941765, 55.75107653, 30)
on conflict (id) do nothing;

INSERT INTO card (card_id, password)
values (1, 'pp1'),
       (2, 'pp2'),
       (3, 'pp3')
on conflict (card_id) do nothing;

INSERT INTO bus_stop (bus_stop_id, bus_stop_name, latitude, longitude)
values (1, 'FIRST', 37.6080909, 55.7500373),
       (2, 'SECOND', 37.62482643, 55.76296051),
       (3, 'THIRD', 37.65941765, 55.74107653)
on conflict (bus_stop_id) do nothing;

INSERT INTO validation (validation_id, bus_stop_id, card_id)
values (1, 2, 1),
       (2, 2, 2),
       (3, 2, 3);
      
INSERT INTO route (route_id, route_number, bus_stop_list)
values (1, '54rf', '1 2 3'),
       (2, '34er', '1 3'),
       (3, '21ee', '3 1');
     
INSERT INTO trip (trip_id, route_id, transport_id)
values (1, 1, 1),
       (2, 1, 2),
       (3, 1, 3);

      
INSERT INTO passenger_stream (stream_id, bus_stop_id, transport_id, in_count, out_count)
values (1, 1, 1, 44, 0),
       (2, 2, 1, 35, 20),
       (3, 3, 1, 46, 10);


