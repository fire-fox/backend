let peticiones = [];
let suscriptores = [];

const agregarPeticion = (mensaje) => {
  peticiones.push(mensaje);
  notificarCambios();
};

const obtenerPeticiones = () => {
  return peticiones;
};

const suscribirseCambios = (callback) => {
  suscriptores.push(callback);
};

const notificarCambios = () => {
  suscriptores.forEach((callback) => {
    callback(peticiones);
  });
};

module.exports = { agregarPeticion, obtenerPeticiones, suscribirseCambios };
