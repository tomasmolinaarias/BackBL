import { DataTypes, Model } from 'sequelize';

class Auditoria extends Model {}

export const initializeAuditoria = (sequelize) => {
  Auditoria.init({
    id_auditoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    correo_electronico: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    evento: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    resultado: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mensaje_error: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_hora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    direccion_ip: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Auditoria',
    tableName: 'auditoria',
    timestamps: false
  });

  return Auditoria;
}
