// config/nodemailer-config.js
import nodemailer from 'nodemailer';

// Configuración básica de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dpalumbiaws@gmail.com',
    pass: 'Dd16944615*/'
  }
});

export default transporter;
