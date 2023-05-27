const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "https://alertasfe.miperu.org",
    methods: ["GET", "POST"]
  }
});
const cors = require('cors');

// Array para almacenar las peticiones
const peticiones = [];

// Agregar una nueva petición
function agregarPeticion(mensaje) {
  peticiones.push(mensaje);
}

// Obtener la lista de peticiones
function obtenerPeticiones() {
  return peticiones;
}

app.use(cors());

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Suscribir al canal 'peticiones'
  socket.on('subscribe', () => {
    socket.join('peticiones');
  });

  // Enviar las peticiones actuales al cliente
  socket.emit('peticiones', { peticiones: obtenerPeticiones() });

  // Suscribirse a cambios en peticiones
  socket.on('peticion', (data) => {
    agregarPeticion(data.mensaje);
    console.log('Peticiones recibidas:', obtenerPeticiones());
    io.to('peticiones').emit('nuevaPeticion', { peticiones: obtenerPeticiones() });
  });
});

// Ruta para obtener la lista de peticiones
app.get('/peticiones', (req, res) => {
  res.json({ peticiones: obtenerPeticiones() });
});

// Iniciar el servidor
const port = 4000;
httpServer.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
