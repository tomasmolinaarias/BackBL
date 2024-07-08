var DataTypes = require("sequelize").DataTypes;
var _alumno = require("./alumno");
var _auditoria = require("./auditoria");
var _bibliotecario = require("./bibliotecario");
var _libros = require("./libros");
var _prestamo = require("./prestamo");
var _reserva = require("./reserva");
var _salaEstudio = require("./salaEstudio");

function initModels(sequelize) {
  var alumno = _alumno(sequelize, DataTypes);
  var auditoria = _auditoria(sequelize, DataTypes);
  var bibliotecario = _bibliotecario(sequelize, DataTypes);
  var libros = _libros(sequelize, DataTypes);
  var prestamo = _prestamo(sequelize, DataTypes);
  var reserva = _reserva(sequelize, DataTypes);
  var salaEstudio = _salaEstudio(sequelize, DataTypes);

  // Asociaciones para Prestamo
  prestamo.belongsTo(alumno, { as: "Alumno", foreignKey: "id_alumno" });
  alumno.hasMany(prestamo, { as: "prestamos", foreignKey: "id_alumno" });

  prestamo.belongsTo(bibliotecario, { as: "Bibliotecario", foreignKey: "id_bibliotecario" });
  bibliotecario.hasMany(prestamo, { as: "prestamos", foreignKey: "id_bibliotecario" });

  prestamo.belongsTo(libros, { as: "Libro", foreignKey: "id_libro" });
  libros.hasMany(prestamo, { as: "prestamos", foreignKey: "id_libro" });

  // Asociaciones para Reserva
  reserva.belongsTo(alumno, { as: "Alumno", foreignKey: "id_alumno" });
  alumno.hasMany(reserva, { as: "reservas", foreignKey: "id_alumno" });

  reserva.belongsTo(bibliotecario, { as: "Bibliotecario", foreignKey: "id_bibliotecario" });
  bibliotecario.hasMany(reserva, { as: "reservas", foreignKey: "id_bibliotecario" });

  reserva.belongsTo(salaEstudio, { as: "SalaEstudio", foreignKey: "id_sala" });
  salaEstudio.hasMany(reserva, { as: "reservas", foreignKey: "id_sala" });

  auditoria.belongsTo(bibliotecario, { as: "Bibliotecario", foreignKey: "id_bibliotecario" });
  bibliotecario.hasMany(auditoria, { as: "auditorias", foreignKey: "id_bibliotecario" });

  return {
    alumno,
    auditoria,
    bibliotecario,
    libros,
    prestamo,
    reserva,
    salaEstudio,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
