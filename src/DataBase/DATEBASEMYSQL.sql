-- MySQL Script generated by MySQL Workbench
-- Mon Jun 24 05:49:20 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema biblioteca
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `biblioteca` ;

-- -----------------------------------------------------
-- Schema biblioteca
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `biblioteca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `biblioteca` ;

-- -----------------------------------------------------
-- Table `biblioteca`.`alumno`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biblioteca`.`alumno` ;

CREATE TABLE IF NOT EXISTS `biblioteca`.`alumno` (
  `id_alumno` INT NOT NULL AUTO_INCREMENT,
  `rut` VARCHAR(13) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `correo_electronico` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_alumno`),
  UNIQUE INDEX `rut` (`rut` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`bibliotecario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biblioteca`.`bibliotecario` ;

CREATE TABLE IF NOT EXISTS `biblioteca`.`bibliotecario` (
  `id_bibliotecario` INT NOT NULL AUTO_INCREMENT,
  `rut` VARCHAR(13) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `correo_electronico` VARCHAR(100) NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL,
  `rol` ENUM('jefe_bibliotecario', 'bibliotecario') NULL DEFAULT 'bibliotecario',
  PRIMARY KEY (`id_bibliotecario`),
  UNIQUE INDEX `rut` (`rut` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`auditoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biblioteca`.`auditoria` ;

CREATE TABLE IF NOT EXISTS `biblioteca`.`auditoria` (
  `id_auditoria` INT NOT NULL AUTO_INCREMENT,
  `id_bibliotecario` INT NOT NULL,
  `tabla_afectada` VARCHAR(100) NOT NULL,
  `id_registro_afectado` INT NOT NULL,
  `detalle_cambio` TEXT NULL DEFAULT NULL,
  `tipo_accion` ENUM('inserccion', 'actualizacion', 'eliminacion') NOT NULL,
  PRIMARY KEY (`id_auditoria`),
  INDEX `fk_auditoria_bibliotecario` (`id_bibliotecario` ASC) VISIBLE,
  CONSTRAINT `fk_auditoria_bibliotecario`
    FOREIGN KEY (`id_bibliotecario`)
    REFERENCES `biblioteca`.`bibliotecario` (`id_bibliotecario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`libros`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biblioteca`.`libros` ;

CREATE TABLE IF NOT EXISTS `biblioteca`.`libros` (
  `id_libro` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(200) NOT NULL,
  `autor` VARCHAR(100) NOT NULL,
  `editorial` VARCHAR(100) NOT NULL,
  `ano_publicacion` YEAR NOT NULL,
  `ISBN` VARCHAR(100) NOT NULL,
  `genero` VARCHAR(100) NOT NULL,
  `idioma` VARCHAR(100) NOT NULL,
  `ubicacion` VARCHAR(100) NOT NULL,
  `cantidad_disponible` INT NOT NULL,
  `cantidad_prestada` INT NOT NULL,
  PRIMARY KEY (`id_libro`),
  UNIQUE INDEX `ISBN` (`ISBN` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`prestamo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biblioteca`.`prestamo` ;

CREATE TABLE IF NOT EXISTS `biblioteca`.`prestamo` (
  `id_prestamo` INT NOT NULL AUTO_INCREMENT,
  `id_alumno` INT NOT NULL,
  `id_libro` INT NOT NULL,
  `id_bibliotecario` INT NOT NULL,
  `fecha_prestamo` DATE NOT NULL,
  `fecha_devolucion` DATE NULL DEFAULT NULL,
  `fecha_limite_devolucion` DATE NOT NULL,
  `estado_devolucion` ENUM('pendiente', 'devuelta', 'con retraso') NOT NULL,
  PRIMARY KEY (`id_prestamo`),
  INDEX `fk_prestamo_alumno` (`id_alumno` ASC) VISIBLE,
  INDEX `fk_prestamo_libro` (`id_libro` ASC) VISIBLE,
  INDEX `fk_prestamo_bibliotecario` (`id_bibliotecario` ASC) VISIBLE,
  CONSTRAINT `fk_prestamo_alumno`
    FOREIGN KEY (`id_alumno`)
    REFERENCES `biblioteca`.`alumno` (`id_alumno`),
  CONSTRAINT `fk_prestamo_bibliotecario`
    FOREIGN KEY (`id_bibliotecario`)
    REFERENCES `biblioteca`.`bibliotecario` (`id_bibliotecario`),
  CONSTRAINT `fk_prestamo_libro`
    FOREIGN KEY (`id_libro`)
    REFERENCES `biblioteca`.`libros` (`id_libro`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`salaEstudio`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biblioteca`.`salaEstudio` ;

CREATE TABLE IF NOT EXISTS `biblioteca`.`salaEstudio` (
  `id_sala` INT NOT NULL AUTO_INCREMENT,
  `nombre_sala` VARCHAR(200) NOT NULL,
  `capacidad` INT NOT NULL,
  `equipamiento` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id_sala`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`reserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biblioteca`.`reserva` ;

CREATE TABLE IF NOT EXISTS `biblioteca`.`reserva` (
  `id_reserva` INT NOT NULL AUTO_INCREMENT,
  `id_alumno` INT NOT NULL,
  `id_sala` INT NOT NULL,
  `id_bibliotecario` INT NOT NULL,
  `hora_inicio` DATETIME NOT NULL,
  `hora_fin` DATETIME NOT NULL,
  `estado_reserva` ENUM('pendiente', 'confirmada', 'cancelada') NOT NULL,
  PRIMARY KEY (`id_reserva`),
  INDEX `fk_reserva_alumno` (`id_alumno` ASC) VISIBLE,
  INDEX `fk_reserva_sala` (`id_sala` ASC) VISIBLE,
  INDEX `fk_reserva_bibliotecario` (`id_bibliotecario` ASC) VISIBLE,
  CONSTRAINT `fk_reserva_alumno`
    FOREIGN KEY (`id_alumno`)
    REFERENCES `biblioteca`.`alumno` (`id_alumno`),
  CONSTRAINT `fk_reserva_bibliotecario`
    FOREIGN KEY (`id_bibliotecario`)
    REFERENCES `biblioteca`.`bibliotecario` (`id_bibliotecario`),
  CONSTRAINT `fk_reserva_sala`
    FOREIGN KEY (`id_sala`)
    REFERENCES `biblioteca`.`salaEstudio` (`id_sala`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
