/* eslint-disable no-console */
import axios from 'axios';
import evaluacion from '../pages/checklist-evaluacion/evaluacion.json';

const url = 'https://autotech2.onrender.com/evaluaciones';

const getChecklistEvaluaciones = async () => axios.get(`${url}/checklist/listar/`);

const postRegistroEvaluaciones = async () => axios({
  method: 'post',
  url: `${url}/registros/crear/`,
  data: {
    id_turno: evaluacion.id_turno,
    id_task_puntaje: evaluacion.id_task_puntaje,
    detalle: evaluacion.detalle,
  },
});

export {
  // eslint-disable-next-line import/prefer-default-export
  getChecklistEvaluaciones,
  postRegistroEvaluaciones,
};
