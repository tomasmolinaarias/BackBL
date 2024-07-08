import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize from '../DataBase/database.js';
import {
    initializeBibliotecario
} from '../DataBase/model/bibliotecario.js'

const Bibliotecario = initializeBibliotecario(sequelize);

const AuthController = {
    login: async (req, res) => {
      const { correo_electronico, contrasena } = req.body;
      try {
        const usuario = await Bibliotecario.findOne({ where: { correo_electronico } });
        if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
  
        const contrasenaValida = bcrypt.compareSync(contrasena, usuario.contrasena);
        if (!contrasenaValida) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }
  
        // Crear el token JWT
        const token = jwt.sign(
          { userId: usuario.id, correo: usuario.correo_electronico, rol: usuario.rol },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
  
        res.json({
          message: "Inicio de sesión exitoso",
          usuario: { nombre: usuario.nombre, rol: usuario.rol },
          token
        });
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    },
  
    solicitarRestablecimiento: async (req, res) => {
      const { correo_electronico } = req.body;
  
      try {
        const usuario = await Bibliotecario.findOne({ where: { correo_electronico } });
        if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
  
        // Crear el token JWT
        const token = jwt.sign(
          { userId: usuario.id, correo: usuario.correo_electronico },
          process.env.JWT_SECRET,
          { expiresIn: '15m' } // El token expira en 15 minutos
        );
  
        res.json({
          message: "Token de restablecimiento de contraseña generado exitosamente",
          token
        });
      } catch (error) {
        console.error("Error al solicitar restablecimiento de contraseña:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    },
  
    restablecerContraseña: async (req, res) => {
      const { token, nuevaContrasena } = req.body;
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Bibliotecario.findOne({ where: { correo_electronico: decoded.correo } });
        if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
  
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(nuevaContrasena, salt);
  
        await usuario.update({ contrasena: hash });
  
        res.json({ message: "Contraseña restablecida exitosamente" });
      } catch (error) {
        console.error("Error al restablecer contraseña:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  };
  
  export default AuthController;