import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);


const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos CONECTADO 🟢');
  } catch (err) {
    console.error('Error al conectar con la base de datos 🔴 :', err.parent);
  }
};

authenticateDatabase();

export default sequelize;