import { Sequelize } from 'sequelize';
import sequelize from '../DataBase/database.js';
import defineAlumno from '../DataBase/model/alumno.js';

const Alumno = defineAlumno(sequelize);

const Alumnos = {
  leer: async (req, res) => {
    try {
      const alumnos = await Alumno.findAll();
      res.status(200).json(alumnos);
    } catch (error) {
      console.error("Error ", error);
      res.status(500).json({
        error: "Error"
      });
    }
  },
  leer1: async (req, res) => {
    const { rut } = req.params;
    // Validación simple, considera utilizar una librería de validación para más complejidad
    if (!rut) {
      return res.status(400).json({ error: "Falta el parámetro rut" });
    }
  
    try {
      const alumnoExistente = await Alumno.findOne({
        where: {
          rut: rut 
        }
      });
      if (!alumnoExistente) {
        return res.status(404).json({ error: "Alumno no encontrado" });
      }
      res.status(200).json(alumnoExistente);
    } catch (error) {
      console.error("Error al buscar al alumno: ", error);
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  },
};

export default Alumnos;
