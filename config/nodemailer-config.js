// config/nodemailer-config.js
import nodemailer from 'nodemailer';

// Configuración básica de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dpalumbiaws@gmail.com',
    pass: '16944615*Dd'
  }
});

export default transporter;
