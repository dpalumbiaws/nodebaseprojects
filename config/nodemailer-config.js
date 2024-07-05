// config/nodemailer-config.js
import nodemailer from 'nodemailer';

// Configuración básica de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-2.amazonaws.com',
  port: 587, 
  secure: false, 
  //service: 'email-smtp.us-east-2.amazonaws.com',
  auth: {
    user: 'AKIA2LA2STXDQRM3NPF2',
    pass: 'BBX2/jXUGW+yOm+tdpUFNhPRf/g7Somcczhj4AY33/LM'
  }
});

export default transporter;
