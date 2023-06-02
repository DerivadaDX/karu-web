import axios from 'axios';

const url = 'https://autotech2.onrender.com/turnos/dias-horarios-disponibles';

const getHorariosEvaluacion = async (branchId) => axios.get(`${url}/${branchId}/`);

const getHorariosService = async (branchId, marca, modelo, km) => axios.get(`${url}/${branchId}/${marca}/${modelo}/${km}/`);

const getHorariosReparacion = async (branchId, patente, origen) => axios.get(`${url}/${branchId}/${patente}/${origen}/`);

const postReprogramarTurno = async () => axios.patch(`${url}/reprogramar-turno/`);

export {
  getHorariosEvaluacion,
  getHorariosService,
  getHorariosReparacion,
  postReprogramarTurno,
};
