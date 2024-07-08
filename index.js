import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { load as middlewareLoad } from './src/middleware/loadMidleware.js';
import { load as routerLoad } from './src/router/loadRouter.js';
import dotenv from 'dotenv';
import sequelize from './src/DataBase/database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


middlewareLoad(app);
routerLoad(app);


app.use('/models', express.static(path.join(__dirname, './src/DataBase/model')));


sequelize.sync({ force: false })
  .then(() => {
    console.log('Sincronización de modelos completada.');
    const PORT = process.env.PORT || 3500;
    app.listen(PORT, () => console.log(`Puerto Activo 🟢 📤 http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Error al sincronizar modelos:', err);
  });