DROP TABLE IF EXISTS transport;
CREATE TABLE transport (
	id 			INT PRIMARY KEY NOT NULL,
 	name		VARCHAR(155) 	NOT NULL,
 	latitude	FLOAT 			NOT NULL,
 	longitude	FLOAT 			NOT NULL,
 	seats		INT				NOT NULL
);

DROP TABLE IF EXISTS card;
CREATE TABLE card (
	card_id 	INT PRIMARY KEY NOT NULL,
 	password	VARCHAR(155) 	NOT NULL
);

DROP TABLE IF EXISTS bus_stop;
CREATE TABLE bus_stop (
	bus_stop_id 	INT PRIMARY KEY NOT NULL,
 	bus_stop_name	VARCHAR(155) 	NOT NULL,
 	latitude		FLOAT			NOT NULL,
 	longitude		FLOAT			NOT NULL
);

DROP TABLE IF EXISTS validation;
CREATE TABLE validation (
	validation_id	INT	PRIMARY KEY	NOT NULL,
	bus_stop_id 	INT  			NOT NULL,
 	card_id 		INT 			NOT NULL
);

DROP TABLE IF EXISTS passenger_stream;
CREATE TABLE passenger_stream (
	stream_id		INT PRIMARY KEY	NOT NULL,
	bus_stop_id 	INT 			NOT NULL,
 	transport_id 	INT 			NOT NULL,
 	in_count		INT				NOT NULL,
 	out_count		INT				NOT NULL
);

DROP TABLE IF EXISTS route;
CREATE TABLE route (
	route_id		INT PRIMARY KEY	NOT NULL,
	route_number 	VARCHAR(155) 	NOT NULL,
 	bus_stop_list 	VARCHAR(155) 	NOT NULL
);

DROP TABLE IF EXISTS trip;
CREATE TABLE trip (
	trip_id		INT PRIMARY KEY	NOT NULL,
	transport_id 		INT 	NOT NULL,
 	route_id 			INT 	NOT NULL
);