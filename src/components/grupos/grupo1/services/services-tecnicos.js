import axios from 'axios';

const url = 'https://autotech2.onrender.com/tecnicos';
const urlEvaluacion = 'https://autotech2.onrender.com/evaluaciones/registros';
const urlReparacion = 'https://autotech2.onrender.com/reparaciones';
const urlExtraordinario = 'https://autotech2.onrender.com/evaluaciones/registros-extraordinario';
const urlService = 'https://autotech2.onrender.com/service/listar/registros-pendientes';

const getTurnosEvaluacion = async (tecnicoId) => axios.get(`${urlEvaluacion}/listar/${tecnicoId}/`);

const getTurnosService = async (tecnicoId) => axios.get(`${urlService}/${tecnicoId}/`);

const getTurnosReparacion = async (tecnicoId) => axios.get(`${urlReparacion}/listar-en-proceso/${tecnicoId}/`);

const getTurnosExtraodinario = async (tecnicoId) => axios.get(`${urlExtraordinario}/listar/${tecnicoId}`);

const getTurnosTerminados = async (tecnicoId) => axios.get(`${url}/trabajos-terminados/${tecnicoId}/`);

const patchFinalizarRegistroReparacion = async (idTurno) => axios.patch(`${urlReparacion}/finalizar/${idTurno}/`);
export {
  getTurnosEvaluacion,
  getTurnosReparacion,
  getTurnosService,
  getTurnosExtraodinario,
  getTurnosTerminados,
  patchFinalizarRegistroReparacion,
};
