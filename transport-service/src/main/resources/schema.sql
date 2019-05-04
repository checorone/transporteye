DROP TABLE IF EXISTS transport;

CREATE TABLE transport (
  id        		UUID PRIMARY KEY NOT NULL,
  name              VARCHAR(100) NOT NULL,
  longitude         REAL NOT NULL,
  latitude          REAL NOT NULL,
  workload          INT  NOT NULL);

INSERT INTO transport (id, name, longitude, latitude, workload)
VALUES ('9928698d-5eff-4ce7-9b25-40d41b6a64ed', 'LIAZ4450', 37.37, 55.45, 50);

INSERT INTO transport (id, name, longitude, latitude, workload)
VALUES ('5fa0d0ae-462b-4e88-895a-7f78b344e93f', 'LIAZ4230', 37.36, 55.44, 40);

INSERT INTO transport (id, name, longitude, latitude, workload)
VALUES ('d4d747c1-a2c3-40d2-95ba-ffc021bcbf13', 'LIAZ7250', 37.36, 55.46, 30);