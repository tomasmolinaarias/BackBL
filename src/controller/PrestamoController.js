import sequelize from '../DataBase/database.js';
import definePrestamo from '../DataBase/model/prestamo.js';
import defineLibros from '../DataBase/model/libros.js';
import { initializeBibliotecario } from '../DataBase/model/bibliotecario.js';
import defineAlumno from '../DataBase/model/alumno.js';

const Alumno = defineAlumno(sequelize);
const Bibliotecario = initializeBibliotecario(sequelize);
const Prestamo = definePrestamo(sequelize);

const Libros = defineLibros(sequelize);
// Aseguramos que las asociaciones están definidas
Prestamo.belongsTo(Alumno, { as: 'Alumno', foreignKey: 'id_alumno' });
Prestamo.belongsTo(Bibliotecario, { as: 'Bibliotecario', foreignKey: 'id_bibliotecario' });
Prestamo.belongsTo(Libros, { as: 'Libro', foreignKey: 'id_libro' });

const PrestamoController = {
  crear: async (req, res) => {
    const { id_alumno, id_libro, id_bibliotecario, fecha_prestamo, estado_devolucion } = req.body;
    try {
      const fechaPrestamo = new Date(fecha_prestamo);
      const fechaLimiteDevolucion = new Date(fechaPrestamo);
      fechaLimiteDevolucion.setDate(fechaPrestamo.getDate() + 14); // Agrega dos semanas

      const nuevoPrestamo = await Prestamo.create({
        id_alumno,
        id_libro,
        id_bibliotecario,
        fecha_prestamo,
        fecha_devolucion: fechaLimiteDevolucion,
        fecha_limite_devolucion: fechaLimiteDevolucion,
        estado_devolucion
      });

      res.status(201).json(nuevoPrestamo);
    } catch (error) {
      console.error('Error al crear el préstamo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  leer: async (req, res) => {
    try {
      const prestamos = await Prestamo.findAll({
        include: [
          { model: Alumno, as: 'Alumno' },
          { model: Bibliotecario, as: 'Bibliotecario' },
          { model: Libros, as: 'Libro' }
        ]
      });
      res.status(200).json(prestamos);
    } catch (error) {
      console.error('Error al leer los préstamos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  actualizar: async (req, res) => {
    const { id_prestamo } = req.params;
    const { id_alumno, id_libro, id_bibliotecario, fecha_prestamo, fecha_limite_devolucion, estado_devolucion } = req.body;
    try {
      const prestamo = await Prestamo.findByPk(id_prestamo);
      if (!prestamo) {
        return res.status(404).json({ error: 'Préstamo no encontrado' });
      }
      await prestamo.update({
        id_alumno,
        id_libro,
        id_bibliotecario,
        fecha_prestamo,
        fecha_limite_devolucion,
        estado_devolucion
      });
      res.status(200).json(prestamo);
    } catch (error) {
      console.error('Error al actualizar el préstamo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  eliminar: async (req, res) => {
    const { id_prestamo } = req.params;
    try {
      const prestamo = await Prestamo.findByPk(id_prestamo);
      if (!prestamo) {
        return res.status(404).json({ error: 'Préstamo no encontrado' });
      }
      await prestamo.destroy();
      res.status(200).json({ message: 'Préstamo eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el préstamo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

export default PrestamoController;
