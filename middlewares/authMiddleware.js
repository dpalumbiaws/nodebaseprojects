// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado - Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'jwt_secret_key');
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error('Error al verificar token:', err);
    return res.status(403).json({ message: 'Acceso no autorizado - Token inválido' });
  }
};

export default authMiddleware;
