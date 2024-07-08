import { DataTypes, Model } from 'sequelize';

class Bibliotecario extends Model {}

export const initializeBibliotecario = (sequelize) => {
  Bibliotecario.init({
    id_bibliotecario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rut: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correo_electronico: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('jefe_bibliotecario', 'bibliotecario'),
      allowNull: true,
      defaultValue: 'bibliotecario'
    }
  }, {
    sequelize,
    modelName: 'Bibliotecario',
    tableName: 'bibliotecario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_bibliotecario" },
        ]
      },
      {
        name: "rut_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rut" },
        ]
      },
      {
        name: "correo_electronico_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "correo_electronico" },
        ]
      },
    ]
  });

  return Bibliotecario;
};
