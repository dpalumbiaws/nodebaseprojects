// routes/forgotPasswordRoutes.js
import express from 'express';
const router = express.Router();
import { forgotPassword } from '../controllers/authController.js';

router.post('/forgot-password', forgotPassword);

export default router;
