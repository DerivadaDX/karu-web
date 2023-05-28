import axios from 'axios';

const url = 'https://autotech2.onrender.com/talleres';

const getTalleres = async () => axios.get(`${url}/talleres-list/`);

const crearTaller = async () => axios.post(`${url}/crear/`);

const getSucursalesActivas = async () => axios.get(`${url}/sucursales-validas-activas/`);

const getDetalleSucursal = async (idTaller) => axios.get(`${url}/sucursales-validas-activas/${idTaller}`);

export {
  getTalleres,
  crearTaller,
  getSucursalesActivas,
  getDetalleSucursal,
};
