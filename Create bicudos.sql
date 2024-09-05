CREATE DATABASE IF NOT EXISTS bicudos;

USE bicudos;

CREATE TABLE IF NOT EXISTS `Dispositivos` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`nome` varchar(255) NOT NULL,
	`latitude` varchar(20) NOT NULL,
	`longitude` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Pastas` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`id_dispositivo` int NOT NULL,
	`nome_pasta` varchar(255) NOT NULL,
	`id_pasta_drive` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Imagens` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`id_pasta` int NOT NULL,
	`nome_imagem` varchar(255) NOT NULL,
	`id_imagem_drive` varchar(255) NOT NULL,
	`data` timestamp NOT NULL,
	PRIMARY KEY (`id`)
);


ALTER TABLE `Pastas` ADD CONSTRAINT `Pastas_fk1` FOREIGN KEY (`id_dispositivo`) REFERENCES `Dispositivos`(`id`);
ALTER TABLE `Imagens` ADD CONSTRAINT `Imagens_fk1` FOREIGN KEY (`id_pasta`) REFERENCES `Pastas`(`id`);