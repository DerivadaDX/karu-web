/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import axios from 'axios';

const url = 'https://autotech2.onrender.com/service';

const getChecklistService = async (idTurno) => axios.get(`${url}/listar/checklist-turno/${idTurno}/`);

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
  postCrearRegistroServices,
};
