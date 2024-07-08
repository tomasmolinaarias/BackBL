const path = require('path');
require('dotenv').config();

module.exports = {
  database: process.env.database,
  username: process.env.user,
  password: process.env.pass,
  host: process.env.host || '127.0.0.1',
  dialect: 'mysql',
  directory: path.join(__dirname, 'model'), 
  port: process.env.PORTDB || 3306,
  additional: {
    timestamps: false
  },
  tables: ['libros', 'alumno', 'bibliotecario', 'salaEstudio', 'prestamo', 'reserva', 'auditoria'], // Lista de tablas a incluir
};
