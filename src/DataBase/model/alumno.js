import { DataTypes } from 'sequelize';

const defineAlumno = (sequelize) => {
  return sequelize.define('Alumno', {
    id_alumno: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rut: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: "rut"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correo_electronico: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'alumno',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_alumno" },
        ]
      },
      {
        name: "rut",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rut" },
        ]
      },
    ]
  });
};

export default defineAlumno;
