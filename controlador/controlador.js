const modelo = require('../modelo/modelo');

const manejarPeticion = (req, res) => {
  const mensaje = req.body.mensaje;
  modelo.agregarPeticion(mensaje);
  console.log('Peticiones recibidas:', modelo.obtenerPeticiones());
  res.status(200).json({ mensaje: 'Peticion recibida correctamente' });
};

module.exports = { manejarPeticion };
