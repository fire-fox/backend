const express = require('express');
const controlador = require('../controlador/controlador');
const modelo = require('../modelo/modelo');

const router = express.Router();

// Ruta para recibir la petición POST
router.post('/', controlador.manejarPeticion);

// Ruta para obtener la lista de peticiones
router.get('/', (req, res) => {
  res.json({ peticiones: modelo.obtenerPeticiones() });
});

module.exports = router;
