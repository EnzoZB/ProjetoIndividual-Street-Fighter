CREATE DATABASE IF NOT EXISTS street_tracker;
USE street_tracker;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
nickname VARCHAR(100) NOT NULL,
cpf CHAR(11) NOT NULL,
email VARCHAR(150) NOT NULL,
senha VARCHAR(100) NOT NULL
);

CREATE TABLE personagem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE luta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    resultado VARCHAR(45) NOT NULL,
    nomeRival VARCHAR(50) NOT NULL,
    data_partida DATE NOT NULL,
    fkUsuario INT NOT NULL,
    fkPersonagem_seu INT NOT NULL,
    fkPersonagem_rival INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    FOREIGN KEY (fkPersonagem_seu) REFERENCES personagem(id),
    FOREIGN KEY (fkPersonagem_rival) REFERENCES personagem(id)
);


INSERT INTO personagem (nome) VALUES 
('Ryu'),       -- ID 1
('Ken'),       -- ID 2
('Chun-Li'),   -- ID 3
('Guile'),     -- ID 4
('Blanka'),    -- ID 5
('E. Honda'),  -- ID 6
('Zangief'),   -- ID 7
('Dhalsim'),   -- ID 8
('Balrog'),    -- ID 9
('Vega'),      -- ID 10
('Sagat'),     -- ID 11
('M. Bison');  -- ID 12

SELECT * FROM luta;
SELECT * FROM usuario;