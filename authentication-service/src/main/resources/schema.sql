DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_roles;

CREATE  TABLE users (
  user_name VARCHAR(100) NOT NULL ,
  password VARCHAR(100) NOT NULL ,
  enabled boolean NOT NULL ,
  PRIMARY KEY (user_name));

CREATE TABLE user_roles (
  user_role_id SERIAL,
  user_name varchar(100) NOT NULL,
  role varchar(100) NOT NULL,
  PRIMARY KEY (user_role_id));

INSERT INTO users(user_name,password,enabled) VALUES ('john.doe','$2a$07$rBXvpd7mznYRADh2LKbhj.GEP3WvyYpvUmVyoqbRjDlEy5GNlLVh.', true);
INSERT INTO users(user_name,password,enabled) VALUES ('john.admindoe','$2a$07$MlgVU4sAh0woZ1DCpOCvie92CTvhXIpCRAVsNNqZJ4aA4KcKfLPsK', true);

INSERT INTO user_roles (user_name, role) VALUES ('john.doe', 'ROLE_USER');
INSERT INTO user_roles (user_name, role) VALUES ('john.admindoe', 'ROLE_ADMIN');
INSERT INTO user_roles (user_name, role) VALUES ('john.admindoe', 'ROLE_USER');
