import axios from 'axios';

const url = 'https://autotech2.onrender.com/tecnicos';
const urlAux = 'https://autotech2.onrender.com/evaluaciones/registros';

const getTurnosEvaluacion = async (tecnicoId) => axios.get(`${urlAux}/listar/${tecnicoId}/`);

const getTurnosService = async (tecnicoId) => axios.get(`${url}/trabajos-en-proceso-service/${tecnicoId}/`);

const getTurnosReparacion = async (tecnicoId) => axios.get(`${url}/trabajos-en-proceso-reparacion/${tecnicoId}/`);

const getTurnosExtraodinario = async (tecnicoId) => axios.get(`${url}/trabajos-en-proceso-extraordinario/${tecnicoId}/`);

const getTurnosTerminados = async (tecnicoId) => axios.get(`${url}/trabajos-terminados/${tecnicoId}/`);

export {
  getTurnosEvaluacion,
  getTurnosReparacion,
  getTurnosService,
  getTurnosExtraodinario,
  getTurnosTerminados,
};
