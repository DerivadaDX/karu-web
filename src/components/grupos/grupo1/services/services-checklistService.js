/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import axios from 'axios';

const url = 'https://autotech2.onrender.com/service';

const getChecklistService = async (idTurno) => axios.get(`${url}/listar/checklist-turno/${idTurno}/`);

const getPrecioService2 = async (idTurno, tareas) => axios.get(`${url}/precio/${idTurno}/${tareas}/`);

const getPrecioService = async (idTurno, params) => {
  try {
    const response = await axios.get(`${url}/precio/${idTurno}/`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postPrecioService = async (idTurno, params) => axios({
  method: 'post',
  url: `${url}/precio/${idTurno}/`,
  data: {
    id_turno: params.id_turno,
    id_tasks_remplazadas: params.id_tasks_remplazadas,
  },
});

const postCrearRegistroServices = async (params) => axios({
  method: 'post',
  url: `${url}/crear/registro/`,
  data: {
    id_turno: params.id_turno,
    id_tasks_remplazadas: params.id_tasks_remplazadas,
  },
});

export {
  // eslint-disable-next-line import/prefer-default-export
  getChecklistService,
  getPrecioService,
  postCrearRegistroServices,
  postPrecioService,
};
