// controllers/profileController.js
const profile = (req, res) => {
    // Datos ficticios de un usuario
    const user = {
      id: 1,
      username: 'usuario_prueba',
      email: 'usuario_prueba@example.com'
      // Puedes agregar más campos según sea necesario
    };
  
    res.json(user);
  };
  
  export {
    profile
  };
ß  