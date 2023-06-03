import axios from 'axios';

const url = 'https://autotech2.onrender.com/turnos';

const getTurnosTodos = async () => axios.get(`${url}/turnos-list/`);

const getDetalleTurno = async (turnoId) => axios.get(`${url}/turnos-detalle/${turnoId}/`);

const getTurnosPendientes = async (branchId) => axios.get(`${url}/pendientes/?branch=${branchId}&papeles_en_regla=true`);

const getTurnosPendientesDeAprobacion = async (branchId) => axios.get(`${url}/pendientes/?branch=${branchId}&papeles_en_regla=false`);

const getTurnosEnProceso = async (branchId) => axios.get(`${url}/en-procesos/?branch=${branchId}`);

const getTurnosTerminados = async (branchId) => axios.get(`${url}/terminados/?branch=${branchId}`);

const getTurnosCancelados = async (branchId) => axios.get(`${url}/cancelados/?branch=${branchId}`);

const getTurnosNoValidos = async (branchId) => axios.get(`${url}/no-validos/?branch=${branchId}`);

const getCancelarTurno = async (turnoId) => axios.patch(`${url}/cancelar-turno/${turnoId}/`);

const patchFinalizarTurno = async (turnoId) => axios.patch(`${url}/actualizar-estado/${turnoId}/`);

export {
  getTurnosTodos,
  getDetalleTurno,
  getTurnosPendientes,
  getTurnosPendientesDeAprobacion,
  getTurnosEnProceso,
  getTurnosTerminados,
  getTurnosCancelados,
  getTurnosNoValidos,
  getCancelarTurno,
  patchFinalizarTurno,
};
