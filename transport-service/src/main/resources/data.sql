INSERT INTO transport (transport_name, transport_longitude, transport_latitude, seats)
values ('LIAZ4450', 37.5880909, 55.7550373, 50),
       ('LIAZ4230', 37.62482643, 55.74296051, 40),
       ('LIAZ7250', 37.63941765, 55.75107653, 30);

INSERT INTO bus_stop (bus_stop_latitude, bus_stop_longitude, bus_stop_name)
VALUES (55.7188, 37.563274, 'АТ13'),
       (55.703945, 37.65666, 'ВТ21'),
       (55.739525, 37.652195, 'КЕ54'),
       (55.74779, 37.58354, 'МИ2');

INSERT INTO validation (bus_stop_id, card_id, transport_id)
values (2, 1, 1),
       (2, 2, 1),
       (2, 3, 1),
       (3, 1, 2),
       (2, 3, 3),
       (2, 1, 3),
       (3, 1, 2),
       (3, 2, 2),
       (3, 2, 2);

INSERT INTO route (route_number, bus_stop_list)
values ('54rf', '1 2 3'),
       ('34er', '1 3'),
       ('21ee', '3 1');

INSERT INTO trip (route_id, transport_id)
values (1, 1),
       (1, 2);

INSERT INTO passenger_stream (bus_stop_id, transport_id, in_count, out_count)
values (1, 1, 20, 0),
       (2, 1, 15, 14),
       (3, 1, 17, 10),
       (2, 2, 8, 3);

INSERT INTO users_trip (card_id, date, bus_stop_id, transport_id)
VALUES ('1234123412341234', '2019-05-18 22:23:21.764000', 1, 0),
       ('0000000000000002', '2019-06-18 12:23:21.764000', 1, 0),
       ('0000000000000002', '2019-06-21 08:00:32.764000', 2, 1),
       ('0000000000000002', '2019-03-07 16:12:03.764000', 1, 2);


