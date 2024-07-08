// /src/controller/Libros.js
import { Sequelize } from 'sequelize';
import sequelize from '../DataBase/database.js';
import defineLibros from '../DataBase/model/libros.js';

const libro = defineLibros(sequelize);

const Libros = {
  leer: async (req, res) => {
    try {
      const libros = await libro.findAll();
      res.status(200).json(libros);
    } catch (error) {
      console.error("Error al leer libros:", error);
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  },
  crear: async (req, res) => {
    const { titulo, autor, editorial, ano_publicacion, ISBN, genero, idioma, ubicacion, cantidad_disponible } = req.body;
    try {
      const nuevoLibro = await libro.create({
        titulo,
        autor,
        editorial,
        ano_publicacion,
        ISBN,
        genero,
        idioma,
        ubicacion,
        cantidad_disponible,
        cantidad_prestada: 0 // Inicialmente, cantidad_prestada debe ser 0
      });
      res.status(201).json(nuevoLibro);
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        res.status(400).json({ error: "El ISBN ya está en uso" });
      } else {
        console.error("Error al crear libro:", error);
        res.status(500).json({
          error: "Error interno del servidor"
        });
      }
    }
  },
  actualizar: async (req, res) => {
    const { id_libro } = req.params;
    const { titulo, autor, editorial, ano_publicacion, ISBN, genero, idioma, ubicacion, cantidad_disponible } = req.body;
    try {
      const libroExistente = await libro.findByPk(id_libro);
      if (!libroExistente) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      // Verificar si el ISBN es diferente del actual
      if (libroExistente.ISBN !== ISBN) {
        // Verificar si el nuevo ISBN ya está en uso por otro libro
        const isbnExistente = await libro.findOne({ where: { ISBN } });
        if (isbnExistente) {
          return res.status(400).json({ error: "El ISBN ya está en uso" });
        }
      }
      await libroExistente.update({
        titulo,
        autor,
        editorial,
        ano_publicacion,
        ISBN,
        genero,
        idioma,
        ubicacion,
        cantidad_disponible
      });
      res.status(200).json(libroExistente);
    } catch (error) {
      console.error("Error al actualizar libro:", error);
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  },
  eliminar: async (req, res) => {
    try {
      const { id_libro } = req.params;
      const deleted = await libro.destroy({
        where: { id_libro: id_libro }
      });
      if (deleted) {
        res.status(200).json({ message: "Libro eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Libro no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar libro:", error);
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  }
};

export default Libros;
