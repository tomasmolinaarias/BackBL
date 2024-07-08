import { DataTypes } from 'sequelize';

const defineSalaEstudio = (sequelize) => {
  return sequelize.define('salaEstudio', {
    id_sala: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_sala: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    equipamiento: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'salaEstudio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_sala" },
        ]
      },
    ]
  });
};

export default defineSalaEstudio;
