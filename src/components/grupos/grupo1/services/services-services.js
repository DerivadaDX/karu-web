import axios from 'axios';

const url = 'https://autotech2.onrender.com/service';

const getServices = async () => axios.get(`${url}/listar/`);

const getChecklist = async (idService) => axios.get(`${url}/listar/checklist-service/${idService}/`);

const putCambiarEstado = async (idService) => axios.put(`${url}/actualizar-estado/${idService}/`);

export {
  getServices,
  getChecklist,
  putCambiarEstado,
};
