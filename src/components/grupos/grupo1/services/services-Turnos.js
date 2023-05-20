import axios from 'axios';

const url='https://autotech2.onrender.com/turnos';

const getTurnosTodos= async () => await axios.get(url+`/turnos-list/`);

const getDetalleTurno = async (turnoId) => await axios.get(url+`/turnos-detalle/${turnoId}/`);

const getTurnosPendientes = async (branchId)=> await axios.get(url+`/pendientes/?branch=`+branchId+`&papeles_en_regla=true`);

const getTurnosPendientesDeAprobacion= async (branchId)=> await axios.get(url+`/pendientes/?branch=`+branchId+`&papeles_en_regla=false`);

const getTurnosEnProceso = async (branchId) => await axios.get(url+`/en-procesos/?branch=`+branchId);

const getTurnosTerminados = async (branchId) => await axios.get(url+`/terminados/?branch=`+branchId);

const getCancelarTurno = async (turnoId) => await axios.patch(url+`/cancelar-turno/${turnoId}/`);

const patchFinalizarTurno = async (turnoId) => await axios.patch(url+`/actualizar-estado/${turnoId}/`);

export {
    getTurnosTodos,
    getDetalleTurno,
    getTurnosPendientes,
    getTurnosPendientesDeAprobacion,
    getTurnosEnProceso,
    getTurnosTerminados,
    getCancelarTurno,
    patchFinalizarTurno,
};
