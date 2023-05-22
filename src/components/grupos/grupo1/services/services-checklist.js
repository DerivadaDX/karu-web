/* eslint-disable no-console */
import axios from 'axios';

const url = 'https://autotech2.onrender.com/evaluaciones';

const getChecklistEvaluaciones = async () => axios.get(`${url}/checklist/listar/`);

export {
  // eslint-disable-next-line import/prefer-default-export
  getChecklistEvaluaciones,
};
