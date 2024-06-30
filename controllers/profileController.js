// controllers/profileController.js
import { User } from '../models/index.js'; // Ajusta la importación según tu estructura de archivos

const profile = async (req, res) => {
  const userId = req.params.id; // Obtener el ID de usuario desde los parámetros de la URL

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error al buscar usuario:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export {
  profile
};
