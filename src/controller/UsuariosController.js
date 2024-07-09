import { Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../DataBase/database.js';
import { initializeBibliotecario } from '../DataBase/model/bibliotecario.js';


const Bibliotecario = initializeBibliotecario(sequelize);

const Bibliotecarios = {
    Bibliotecarios: async (req, res) => {
        try {
            const rol = req.query.rol; // Extrae el rol de la consulta
            let condiciones = {
                attributes: ['nombre', 'correo_electronico', 'rol','rut']
            };
            if (rol) {
                if (rol === 'bibliotecario') {
                    condiciones.where = {
                        rol: rol
                    };
                } else {

                    return res.status(400).json({
                        error: "Rol especificado no es válido. Solo 'bibliotecario' o 'jefe_bibliotecario' son aceptados."
                    });
                }
            } else {

                condiciones.where = {
                    rol: 'bibliotecario'
                };
            }

            const usuarios = await Bibliotecario.findAll(condiciones);
            res.status(200).json(usuarios);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    },
    bibliotecario: async (req, res) => {
        const { rut } = req.params;
        if (!rut) {
          return res.status(400).json({ error: "Falta el parámetro rut" });
        }
      
        try {
          const BibliotecarioExistente = await Bibliotecario.findOne({
            where: {
              rut: rut 
            }
          });
          if (!BibliotecarioExistente) {
            return res.status(404).json({ error: "Bibliotecario no encontrado" });
          }
          res.status(200).json(BibliotecarioExistente);
        } catch (error) {
          console.error("Error al buscar al Bibliotecario: ", error);
          res.status(500).json({
            error: "Error interno del servidor"
          });
        }
    }
};

const JefeBibliotecarios = {
    Jefe: async (req, res) => {
        try {
            const rol = req.query.rol; // Extrae el rol de la consulta
            let condiciones = {
                attributes: ['nombre', 'correo_electronico', 'rol']
            };
            if (rol) {
                if (rol === 'jefe_bibliotecario') {
                    condiciones.where = {
                        rol: rol
                    };
                } else {

                    return res.status(400).json({
                        error: "Rol especificado no es válido. Solo 'bibliotecario' o 'jefe_bibliotecario' son aceptados."
                    });
                }
            } else {

                condiciones.where = {
                    rol: 'jefe_bibliotecario'
                };
            }

            const usuarios = await Bibliotecario.findAll(condiciones);
            res.status(200).json(usuarios);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }
};

const  User ={
    crearUsuario: async (req, res) => {
        console.log(req.body)
        const { nombre, correo_electronico, contrasena, rol, rut } = req.body;

        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(contrasena, salt);

            const nuevoUsuario = await Bibliotecario.create({
                nombre,
                correo_electronico,
                contrasena: hash,
                rol,
                rut
            });

            res.status(201).json({
                message: "Usuario creado exitosamente",
                usuario: {
                    id: nuevoUsuario.id,
                    nombre: nuevoUsuario.nombre,
                    correo_electronico: nuevoUsuario.correo_electronico,
                    rol: nuevoUsuario.rol,
                    rut: nuevoUsuario.rut
                }
            });
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                res.status(400).json({ error: "El correo electrónico ya está en uso" });
            } else {
                console.error("Error al crear usuario:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        }
    },
    eliminarUsuario: async (req, res) => {
        const { rut } = req.params;

        try {
            const usuario = await Bibliotecario.findOne({ where: { rut } });

            if (!usuario) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            await usuario.destroy();
            res.status(200).json({ message: "Usuario eliminado exitosamente" });
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};
export { Bibliotecarios, JefeBibliotecarios, User };
