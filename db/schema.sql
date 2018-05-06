DROP DATABASE IF EXISTS proximity;

CREATE DATABASE proximity;


CREATE TABLE POI (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    address VARCHAR(255),
    lat DECIMAL(9,6),
    lng DECIMAL(9,6),
    link VARCHAR(255),
    category VARCHAR(255),
    body TEXT
 ); 