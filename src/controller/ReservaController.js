import sequelize from '../DataBase/database.js';
import defineReserva from '../DataBase/model/reserva.js';
import defineAlumno from '../DataBase/model/alumno.js';
import defineSalaEstudio from '../DataBase/model/salaEstudio.js';
import { initializeBibliotecario } from '../DataBase/model/bibliotecario.js';

// Definimos los modelos
const Reserva = defineReserva(sequelize);
const Alumno = defineAlumno(sequelize);
const SalaEstudio = defineSalaEstudio(sequelize);
const Bibliotecario = initializeBibliotecario(sequelize);

// Definimos las asociaciones en el controlador
Reserva.belongsTo(Alumno, { as: 'Alumno', foreignKey: 'id_alumno' });
Reserva.belongsTo(Bibliotecario, { as: 'Bibliotecario', foreignKey: 'id_bibliotecario' });
Reserva.belongsTo(SalaEstudio, { as: 'SalaEstudio', foreignKey: 'id_sala' });

const ReservaController = {
  crear: async (req, res) => {
    const { id_alumno, id_sala, id_bibliotecario, hora_inicio, hora_fin, estado_reserva } = req.body;
    try {
      const nuevaReserva = await Reserva.create({
        id_alumno,
        id_sala,
        id_bibliotecario,
        hora_inicio,
        hora_fin,
        estado_reserva
      });
      res.status(201).json(nuevaReserva);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  leer: async (req, res) => {
    try {
      const reservas = await Reserva.findAll({
        include: [
          { model: Alumno, as: 'Alumno' },
          { model: SalaEstudio, as: 'SalaEstudio' },
          { model: Bibliotecario, as: 'Bibliotecario' }
        ]
      });
      res.status(200).json(reservas);
    } catch (error) {
      console.error('Error al leer las reservas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  actualizar: async (req, res) => {
    const { id_reserva } = req.params;
    const { id_alumno, id_sala, id_bibliotecario, hora_inicio, hora_fin, estado_reserva } = req.body;
    try {
      const reserva = await Reserva.findByPk(id_reserva);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      await reserva.update({
        id_alumno,
        id_sala,
        id_bibliotecario,
        hora_inicio,
        hora_fin,
        estado_reserva
      });
      res.status(200).json(reserva);
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  eliminar: async (req, res) => {
    const { id_reserva } = req.params;
    try {
      const reserva = await Reserva.findByPk(id_reserva);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      await reserva.destroy();
      res.status(200).json({ message: 'Reserva eliminada con éxito' });
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

export default ReservaController;
