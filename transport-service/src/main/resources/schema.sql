CREATE TABLE if not exists transport
(
    id        UUID PRIMARY KEY NOT NULL,
    name      VARCHAR(100)     NOT NULL,
    longitude REAL             NOT NULL,
    latitude  REAL             NOT NULL,
    workload  INT              NOT NULL
);

INSERT INTO transport (id, name, longitude, latitude, workload)
values ('9928698d-5eff-4ce7-9b25-40d41b6a64ed', 'LIAZ4450', 37.5880909, 55.7550373, 50),
       ('5fa0d0ae-462b-4e88-895a-7f78b344e93f', 'LIAZ4230', 37.62482643, 55.74296051, 40),
       ('d4d747c1-a2c3-40d2-95ba-ffc021bcbf13', 'LIAZ7250', 37.63941765, 55.75107653, 30)
on conflict (id) do nothing;
