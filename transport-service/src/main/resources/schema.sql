CREATE TABLE transport (
	id 			UUID 			PRIMARY KEY NOT NULL,
 	name		VARCHAR(155) 	NOT NULL,
 	latitude	FLOAT 			NOT NULL,
 	longitude	FLOAT 			NOT NULL,
 	workload	INT				NOT NULL
);

CREATE TABLE card (
	card_id 	VARCHAR(155) 	PRIMARY KEY NOT NULL,
 	password	VARCHAR(155) 	NOT NULL
);


CREATE TABLE bus_stop (
	bus_stop_id 	VARCHAR(155) 	PRIMARY KEY NOT NULL,
 	bus_stop_name	VARCHAR(155) 	NOT NULL,
 	latitude		VARCHAR(20)		NOT NULL,
 	longitude		VARCHAR(20)		NOT NULL
);

CREATE TABLE validation (
	bus_stop_id 	VARCHAR(155) 	PRIMARY KEY NOT NULL,
 	card_id 		VARCHAR(155) 	NOT NULL
);