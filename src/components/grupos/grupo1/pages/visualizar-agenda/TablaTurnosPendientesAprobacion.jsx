/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MaterialReactTable from 'material-react-table';
import {
  getTurnosPendientesDeAprobacion,
  getCancelarTurno,
} from '../../services/services-Turnos';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTurno from '../../components/common/DetalleTurno';

const TablaTurnosPendientesDeAprobacion = (props) => {
  const { idTaller } = props;
  const [turnosPendientesDeAprobacion, setTurnosPendientesDeAprobacion] = useState([]);
  const [loading, setLoading] = useState(true);
  // Para ver el detalle del turno
  const [openVerMas, setVerMas] = useState(false);
  const [rowDetalle, setRowDetalle] = useState({});

  const [openCancel, setOpenCancel] = useState(false);
  const [resCancelar, setResCancelar] = useState([]);
  const [idTurnoCancelar, setIdTurnoCancelar] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [actualizarTabla, setActualizarTabla] = useState(false);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerTurnos = useCallback(() => {
    getTurnosPendientesDeAprobacion(idTaller)
      .then((response) => {
        setTurnosPendientesDeAprobacion(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType('error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error en el servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
        );
      });
  }, []);

  useEffect(() => {
    try {
      traerTurnos();
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error al traer los turnos. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
    setActualizarTabla(false); // Reiniciar el estado de actualizarTabla
    setAlertType('');
  }, [traerTurnos, actualizarTabla]);

  const cancelarTurno = (idTurno) => {
    getCancelarTurno(idTurno)
      .then((response) => {
        setResCancelar(response.data);
        setActualizarTabla(true); // Para actualizar la tabla despues de cancelar turno
      })
      .catch((error) => {
        setResCancelar(error.message);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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
        accessorKey: 'estado',
        header: 'Estado',
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
    ],
    [],
  );

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.2em' }}
    >
      <Button
        variant="contained"
        sx={{ fontSize: '0.9em', backgroundColor: 'rgba(51,51,51,0.75)' }}
        onClick={() => {
          setRowDetalle(row.original);
          setVerMas(true);
        }}
      >
        Ver más
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ fontSize: '0.9em' }}
        onClick={() => {
          // console.log('Cancelar turno', row.original.id_turno);
          setIdTurnoCancelar(row.original.id_turno);
          setOpenCancel(true);
        }}
      >
        Cancelar Turno
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

  const filaDetalle = (llave, valor) => {
    if (llave === 'papeles_en_regla') {
      return null;
    }
    return (
      <>
        <span>
          <strong>
            {llave}
            :
            {' '}
          </strong>
        </span>
        <span>{valor}</span>

      </>
    );
  };

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
        data={turnosPendientesDeAprobacion}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        muiTopToolbarProps={{
          sx: {
            display: 'flex',
            flexWrap: 'inherit',
            justifyContent: 'flex-end',
            overflow: 'auto',
            maxHeight: '200px',
          },
        }}
      />
      <Popup
        title={<LittleHeader titulo="Cancelar turno" />}
        openDialog={openCancel}
        setOpenDialog={setOpenCancel}
        description="¿Está seguro que desea cancelar el turno? No se podrá modificar la acción una vez realizada."
      >
        <Box>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                cancelarTurno(idTurnoCancelar);
                setOpenCancel(false);
                setOpenSnackbar(true);
              }}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenCancel(false);
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
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      />
      <Popup
        title={<LittleHeader titulo="Detalle de turno" />}
        openDialog={openVerMas}
        setOpenDialog={setVerMas}
        botonRetorno="Atras"
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setVerMas} row={rowDetalle} />
      </Popup>
    </>
  );
};

export default TablaTurnosPendientesDeAprobacion;
