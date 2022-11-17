CREATE DATABASE tourism_agency;

USE tourism_agency

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(45) NOT NULL,
    roleiD INTEGER NOT NULL,
    FOREIGN KEY roleId REFERENCES role(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    description TEXT
);

CREATE TABLE individual_contracts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nro_contract INT NOT NULL,
    indicated_date DATE NOT NULL,
    indicated_value DECIMAL(8,2) NOT NULL,
    payment_method VARCHAR(25) NOT NULL,
    idUser INT NOT NULL,
    idStudent INT NOT NULL,
    idGeneralContract INT NOT NULL,
    idFee INT,
    idStateContract INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES students(id),
    FOREIGN KEY (idStudent) REFERENCES students(id),
    FOREIGN KEY (idGeneralContract) REFERENCES general_contracts(id),
    FOREIGN KEY (idFee) REFERENCES fees(id),
    FOREIGN KEY (idStateContract) REFERENCES state_contracts(id)
);

CREATE TABLE students (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(11) NOT NULL,
    birth_date DATE NOT NULL,
    phone VARCHAR(12) NOT NULL,
    idUser INT NOT NULL,
    FOREIGN KEY idUser REFERENCES users(id)
);

CREATE TABLE fees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    financing INT(2) NOT NULL,
    first_expired_date DATE NOT NULL,
    last_expired_date DATE,
    first_expired_value DECIMAL(8, 2) NOT NULL,
    last_expired_value DECIMAL(8, 2),
);

CREATE TABLE state_individual_contracts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    state TEXT NOT NULL
);

CREATE TABLE general_contracts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nro_contract INT NOT NULL,
    indicated_date DATE NOT NULL,
    indicated_value DECIMAL(11, 2) NOT NULL,
    travel_date DATE NOT NULL,
    idTravelDestination INT NOT NULL,
    idStateContract INT NOT NULL,
    idIndividualContract INT NOT NULL,
    idResponsible_generalContracts INT NOT NULL,
    FOREIGN KEY idTravelDestination REFERENCES travel_destination(id),
    FOREIGN KEY idStateContract REFERENCES state_contracts(id),
    FOREIGN KEY idIndividualContract REFERENCES individual_contracts(id),
    FOREIGN KEY idResponsible_generalContracts REFERENCES responsible_generalContracts(id),
);

CREATE TABLE state_general_contracts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    state TEXT NOT NULL
);

CREATE TABLE travel_destination (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE responsible_generalContracts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idGeneralContracts INT NOT NULL,
    idResponsibleSenior INT NOT NULL
);

CREATE TABLE responsible_senior (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(11) NOT NULL,
    name VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    birth_date DATE NOT NULL,
    phone VARCHAR(12) NOT NULL,
    idResponsible_generalContracts INT NOT NULL,
    FOREIGN KEY idResponsible_generalContracts REFERENCES responsible_generalContracts(id)
);