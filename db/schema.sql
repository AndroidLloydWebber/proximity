DROP DATABASE IF EXISTS proximity;

CREATE DATABASE proximity;

CREATE TABLE events (
d INT NOT NULL PRIMARY KEY,
name VARCHAR(40),
start VARCHAR(30),
days INT NOT NULL,
date_made DATE,
rental_price FLOAT
);