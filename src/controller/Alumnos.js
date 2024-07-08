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
};

export default Alumnos;
