// controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import transporter from '../config/nodemailer-config.js';

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ user: user }, 'jwt_secret_key', { expiresIn: '1h' });

    const mailOptions = {
      from: 'account@baseproject.org',
      to: email,
      subject: 'Verifica tu cuenta',
      html: `
        <p>¡Gracias por registrarte en nuestra aplicación!</p>
        <p>Por favor, haz click en el siguiente enlace para verificar tu cuenta:</p>
        <a href="http://api.baseproject.org:3000/verify/${token}">Verificar cuenta</a>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Usuario registrado exitosamente. Por favor, verifica tu correo electrónico' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.login(user, { session: false }, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error interno del servidor' });
      }

      const token = jwt.sign({ user: user}, 'jwt_secret_key', { expiresIn: '1h' });
      return res.json({ token });
    });
  })(req, res, next);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'No se encontró ninguna cuenta con ese correo electrónico' });
    }

    const token = jwt.sign({ userId: user.id }, 'jwt_secret_key', { expiresIn: '1h' });

    const mailOptions = {
      from: 'account@baseproject.org',
      to: email,
      subject: 'Recuperación de Contraseña',
      html: `
        <p>¡Hola ${user.username}!</p>
        <p>Has solicitado recuperar tu contraseña. Haz click en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="http://api.baseproject.org:3000/reset-password/${token}">Cambiar Contraseña</a>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Se ha enviado un correo electrónico con instrucciones para cambiar tu contraseña' });
  } catch (err) {
    console.error('Error al enviar correo de recuperación de contraseña:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, 'jwt_secret_key');
    const userId = decoded.userId;

    let user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: 'Cuenta verificada exitosamente' });
  } catch (err) {
    console.error('Error al verificar cuenta:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
 const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, 'jwt_secret_key');

    // Aquí puedes implementar la lógica para actualizar la contraseña del usuario
    // Puedes usar el ID del usuario obtenido de decoded.userId y newPassword

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (err) {
    console.error('Error al resetear la contraseña:', err);
    res.status(400).json({ message: 'El token no es válido o ha expirado' });
  }
};
export {
  signup,
  login,
  forgotPassword,
  verifyEmail,
  resetPassword
};
