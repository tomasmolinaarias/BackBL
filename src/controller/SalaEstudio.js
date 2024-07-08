import sequelize from '../DataBase/database.js';
import defineSalaEstudio from '../DataBase/model/salaEstudio.js';


const SalaEstudio = defineSalaEstudio(sequelize);

const SalasDeEstudio = {
  leer: async (req, res) => {
    try {
      const salas = await SalaEstudio.findAll();
      res.status(200).json(salas);
    } catch (error) {
      console.error("Error al leer salas de estudio:", error);
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  },
  crear: async (req, res) => {
    const { nombre_sala, capacidad, equipamiento } = req.body;
    try {
      const nuevaSala = await SalaEstudio.create({
        nombre_sala,
        capacidad,
        equipamiento
      });
      res.status(201).json(nuevaSala);
    } catch (error) {
      console.error("Error al crear sala de estudio:", error);
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  },
  actualizar: async (req, res) => {
    const { id_sala } = req.params;
    const { nombre_sala, capacidad, equipamiento } = req.body;
    try {
      const salaExistente = await SalaEstudio.findByPk(id_sala);
      if (!salaExistente) {
        return res.status(404).json({ error: "Sala de estudio no encontrada" });
      }
      await salaExistente.update({
        nombre_sala,
        capacidad,
        equipamiento
      });
      res.status(200).json(salaExistente);
    } catch (error) {
      console.error("Error al actualizar sala de estudio:", error);
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  },
  eliminar: async (req, res) => {
    const { id_sala } = req.params;
    try {
      const salaExistente = await SalaEstudio.findByPk(id_sala);
      if (!salaExistente) {
        return res.status(404).json({ error: "Sala de estudio no encontrada" });
      }
      await salaExistente.destroy();
      res.status(200).json({ message: "Sala de estudio eliminada con éxito" });
    } catch (error) {
      console.error("Error al eliminar sala de estudio:", error);
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  }
};

export default SalasDeEstudio;
