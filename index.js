// index.js
import express from 'express';
import bodyParser from 'body-parser';
import passport from './config/passport-config.js'; // Ajusta según tu configuración real
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/db.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Rutas
app.use('/auth', userRoutes);

// Sincronizar base de datos y arrancar el servidor
sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Servidor de autenticación en ejecución en http://localhost:3000');
  });
}).catch(err => {
  console.error('Error al conectar con la base de datos:', err);
});
