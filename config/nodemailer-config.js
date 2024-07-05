// config/nodemailer-config.js
import nodemailer from 'nodemailer';

// Configuración básica de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'baseproject.org',
  auth: {
    user: 'account@baseproject.org',
    pass: '16944615*Dd'
  }
});

export default transporter;
