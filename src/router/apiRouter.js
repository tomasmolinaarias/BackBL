import express from "express";
import Alumnos from "../controller/alumnos.js";
import Libros from "../controller/Libros.js";
import HolaMundo from "../controller/HolaMundo.js";
import { Bibliotecarios, JefeBibliotecarios, User } from "../controller/UsuariosController.js";
import AuthController from "../auth/AuthController.js";
import PrestamoController from "../controller/PrestamoController.js";
import SalaEstudioController from "../controller/SalaEstudio.js";
import ReservaController from "../controller/ReservaController.js";

const router = express.Router();

// GET
router.get("/", HolaMundo.saludos);
router.get('/alumnos', Alumnos.leer);
router.get('/libros', Libros.leer);
router.get('/bibliotecarios', Bibliotecarios.Bibliotecarios);
router.get('/bibliotecarios/jefes', JefeBibliotecarios.Jefe);
router.get('/prestamos', PrestamoController.leer);
router.get('/salas', SalaEstudioController.leer);
router.get('/reservas', ReservaController.leer);

// POST
router.post('/usuarios', User.crearUsuario);
router.post('/login', AuthController.login);
router.post('/prestamos', PrestamoController.crear);
router.post('/salas', SalaEstudioController.crear);
router.post('/reservas', ReservaController.crear);
router.post('/restablecer-contrasena', AuthController.restablecerContraseña);
router.post('/recuperar-contrasena', AuthController.solicitarRestablecimiento);
router.post('/libros', Libros.crear);

// PUT
router.put('/libros/:id_libro', Libros.actualizar);
router.put('/salas/:id_sala', SalaEstudioController.actualizar);
router.put('/prestamos/:id_prestamo', PrestamoController.actualizar);
router.put('/reservas/:id_reserva', ReservaController.actualizar);

// DELETE
router.delete('/usuarios/:rut', User.eliminarUsuario);
router.delete('/libros/:id_libro', Libros.eliminar);
router.delete('/salas/:id_sala', SalaEstudioController.eliminar);
router.delete('/prestamos/:id_prestamo', PrestamoController.eliminar);
router.delete('/reservas/:id_reserva', ReservaController.eliminar);

export default router;
