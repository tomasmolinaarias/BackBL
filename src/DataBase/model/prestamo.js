import { DataTypes } from 'sequelize';

const definePrestamo = (sequelize) => {
  return sequelize.define('Prestamo', {
    id_prestamo: {
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
    id_libro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'libros',
        key: 'id_libro'
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
    fecha_prestamo: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_devolucion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_limite_devolucion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado_devolucion: {
      type: DataTypes.ENUM('pendiente', 'devuelta', 'con retraso'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'prestamo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_prestamo" },
        ]
      },
      {
        name: "fk_prestamo_alumno",
        using: "BTREE",
        fields: [
          { name: "id_alumno" },
        ]
      },
      {
        name: "fk_prestamo_libro",
        using: "BTREE",
        fields: [
          { name: "id_libro" },
        ]
      },
      {
        name: "fk_prestamo_bibliotecario",
        using: "BTREE",
        fields: [
          { name: "id_bibliotecario" },
        ]
      },
    ]
  });
};

export default definePrestamo;
