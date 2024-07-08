import { DataTypes } from 'sequelize';
const defineLibros = (sequelize)=> {
  return sequelize.define('libros', {
    id_libro: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    editorial: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ano_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ISBN: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "ISBN"
    },
    genero: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    idioma: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cantidad_disponible: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_prestada: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'libros',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_libro" },
        ]
      },
      {
        name: "ISBN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ISBN" },
        ]
      },
    ]
  });
};
export default defineLibros;