// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { signup, login, forgotPassword, verifyEmail } from '../controllers/authController.js';
import { profile } from '../controllers/profileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// Rutas de autenticación y gestión de usuarios
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/verify/:token', verifyEmail);

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authMiddleware, profile);

export default router;
