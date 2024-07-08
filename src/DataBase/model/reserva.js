import { DataTypes } from 'sequelize';

const defineReserva = (sequelize) => {
  return sequelize.define('reserva', {
    id_reserva: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_alumno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alumno',
        key: 'id_alumno'
      }
    },
    id_sala: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'salaEstudio',
        key: 'id_sala'
      }
    },
    id_bibliotecario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bibliotecario',
        key: 'id_bibliotecario'
      }
    },
    hora_inicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado_reserva: {
      type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reserva',
    timestamps: false
  });
};

export default defineReserva;
