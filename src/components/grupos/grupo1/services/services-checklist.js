import axios from 'axios';

const url='https://autotech2.onrender.com/evaluaciones';

const getChecklistEvaluaciones = async () => await axios.get(url+`/checklist/listar/`);

export {
    getChecklistEvaluaciones,
};
