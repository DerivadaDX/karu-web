/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { Box, Button } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import {
  getTurnosEnProceso,
  patchFinalizarTurno,
  getCancelarTurno,
} from '../../services/services-Turnos';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import DetalleTurno from '../../components/common/DetalleTurno';
import LittleHeader from '../../components/common/LittleHeader';

const TablaTurnosEnProgreso = (props) => {
  const { idTaller } = props;

  const [turnosEnProceso, setTurnosEnProceso] = useState([]);
  const [loading, setLoading] = useState(true);
  // Para el detalle del turno
  const [openVerMas, setVerMas] = useState(false);
  const [rowDetalle, setRowDetalle] = useState({});

  const [openFinalizar, setOpenFinalizar] = useState(false);
  const [resFinalizar, setResFinalizar] = useState([]);
  const [idTurnoFinalizar, setIdTurnoFinalizar] = useState(0);

  const [idTurnoCancelar, setIdTurnoCancelar] = useState(0);
  const [resCancelar, setResCancelar] = useState([]);
  const [openCancelar, setOpenCancelar] = useState(false);

  const [openSnackbarCancelar, setOpenSnackbarCancelar] = useState(false);
  const [openSnackbarFinalizar, setOpenSnackbarFinalizar] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerTurnos = useCallback(() => {
    getTurnosEnProceso(idTaller)
      .then((response) => {
        setTurnosEnProceso(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType('Error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error en el servidor. Por favor, vuelva a intentarlo nuevamente.',
        );
      });
  }, []);

  useEffect(() => {
    traerTurnos();
    setActualizarTabla(false); // Reiniciar el estado de actualizarTabla
    setAlertType('');
  }, [traerTurnos, actualizarTabla]);

  const finalizarTurno = (idTurno) => {
    patchFinalizarTurno(idTurno)
      .then((response) => {
        setResFinalizar(response.data);
        setActualizarTabla(true); // Para actualizar la tabla despues de cancelar turno
      })
      .catch((error) => {
        setResFinalizar(error.response.data);
      });
  };

  const cancelarTurno = (idTurno) => {
    getCancelarTurno(idTurno)
      .then((response) => {
        setResCancelar(response.data);
        setActualizarTabla(true); // Para actualizar la tabla despues de cancelar turno
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setResCancelar(error.response.data.error);
        } else {
          setResCancelar(error.message);
        }
      });
  };

  const handleCloseSnackbarCancelar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarCancelar(false);
  };

  const handleCloseSnackbarFinalizar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarFinalizar(false);
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id_turno',
        header: 'Turno id',
      },
      {
        accessorKey: 'patente',
        header: 'Patente',

      },
      {
        accessorKey: 'tipo',
        header: 'Tipo de Turno',
      },
      {
        accessorKey: 'fecha_inicio',
        header: 'Fecha',
      },
      {
        accessorKey: 'hora_inicio',
        header: 'Hora',
      },
      {
        accessorKey: 'tecnico_id',
        header: 'Tecnico id',
      },
    ],
    [],
  );

  const tablaStyle = {
    overflow: 'scroll',
  };

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.2em', padding: '0.2em' }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{ fontSize: '0.7em', backgroundColor: 'rgba(51,51,51,0.75)' }}
        onClick={() => {
          setRowDetalle(row.original);
          setVerMas(true);
        }}
      >
        Ver
        <br />
        más
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        sx={{ fontSize: '0.7em' }}
        onClick={() => {
          setOpenCancelar(true);
          setIdTurnoCancelar(row.original.id_turno);
        }}
      >
        Cancelar
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ fontSize: '0.7em' }}
        onClick={() => {
          setOpenFinalizar(true);
          setIdTurnoFinalizar(row.original.id_turno);
        }}
      >
        Finalizar
      </Button>
    </Box>
  );

  const noData = () => (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Alerts
        title="No hay datos"
        description="No hay datos disponibles en este momento"
        alertType="info"
      />
    </Box>
  );

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Alerts
          alertType={alertType}
          description={alertMessage}
          title={alertTitle}
        />
      </Box>
      <MaterialReactTable
        columns={columnas}
        data={turnosEnProceso}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        localization={MRT_Localization_ES}
        defaultColumn={{ size: 5 }}
        initialState={{ density: 'compact' }}
        muiTopToolbarProps={{
          sx: {
            display: 'flex',
            flexWrap: 'inherit',
            justifyContent: 'flex-end',
            overflow: 'auto',
            maxHeight: '200px',
          },
        }}
        muiTableHeadCellProps={{ align: 'center' }}
        muiTableBodyCellProps={{ align: 'center' }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
      />
      <Popup
        title={<LittleHeader titulo="Finalizar turno" />}
        openDialog={openFinalizar}
        setOpenDialog={setOpenFinalizar}
        description="¿Está seguro que desea finalizar el turno? No se podrá modificar la acción una vez realizada."
        disableBackdropClick
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                finalizarTurno(idTurnoFinalizar);
                setOpenFinalizar(false);
                setOpenSnackbarFinalizar(true);
              }}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenFinalizar(false);
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Snackbar
        message={resFinalizar}
        autoHideDuration={4000}
        open={openSnackbarFinalizar}
        onClose={handleCloseSnackbarFinalizar}
      />
      <Popup
        title={<LittleHeader titulo="Cancelar turno" />}
        openDialog={openCancelar}
        setOpenDialog={setOpenCancelar}
        description="¿Está seguro que desea cancelar el turno? No se podrá modificar la acción una vez realizada."
        disableBackdropClick
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                cancelarTurno(idTurnoCancelar);
                setOpenCancelar(false);
                setOpenSnackbarCancelar(true);
              }}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenCancelar(false);
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Snackbar
        message={resCancelar}
        autoHideDuration={4000}
        open={openSnackbarCancelar}
        onClose={handleCloseSnackbarCancelar}
      />
      <Popup
        title={<LittleHeader titulo="Detalle de turno" />}
        openDialog={openVerMas}
        setOpenDialog={setVerMas}
        disableBackdropClick
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setVerMas} row={rowDetalle} />
      </Popup>
    </>
  );
};

export default TablaTurnosEnProgreso;
