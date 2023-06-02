/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const url = 'https://autotech2.onrender.com/reparaciones';

const getChecklistReparacion = async (idTurno) => axios.get(`${url}/listar/${idTurno}/`);

export {
  getChecklistReparacion,
};
