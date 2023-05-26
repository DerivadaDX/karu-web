/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { Box, Button, IconButton } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import DialogActions from '@mui/material/DialogActions';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import CancelIcon from '@mui/icons-material/Cancel';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTurno from '../../components/common/DetalleTurno';

import {
  getCancelarTurno,
  getTurnosPendientes,
} from '../../services/services-Turnos';

const TablaServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [openVerMas, setVerMas] = useState(false);
  const [rowDetalle, setRowDetalle] = useState({});

  const [resActivar, setResActivar] = useState([]);
  const [idServiceActivar, setIdServiceActivar] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);

  // Para abrir el formulario de asignacion
  const [idServiceChecklist, setIdServiceChecklist] = useState(0);
  const [openChecklist, setOpenChecklist] = useState(false);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id_service',
        header: 'Service id',
      },
      {
        accessorKey: 'marca',
        header: 'Marca',
      },
      {
        accessorKey: 'modelo',
        header: 'Modelo',
      },
      {
        accessorKey: 'frecuencia_km',
        header: 'Frecuencia',
      },
      {
        accessorKey: 'activo',
        header: 'Activo',
      },
    ],
    [],
  );

  const traerTurnos = useCallback(() => {
    getTurnosPendientes('S002')
      .then((response) => {
        setServices(response.data);
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
      setActualizarTabla(false); // Reiniciar el estado de actualizarTabla
      setAlertType('');
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error al traer los services. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
  }, [traerTurnos, actualizarTabla]);

  const cancelarTurno = (idTurno) => {
    getCancelarTurno(idTurno)
      .then((response) => {
        setResActivar(response.data);
        // Para actualizar la tabla despues de activar o desactivar un service
        setActualizarTabla(true);
      })
      .catch((error) => {
        setResActivar(error.message);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

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
        color="secondary"
        sx={{ fontSize: '0.9em' }}
        size="small"
        onClick={() => {
          setOpenChecklist(true);
          setIdServiceChecklist(row.original.id_service);
        }}
      >
        Checklist
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ fontSize: '0.9em' }}
        onClick={() => {
          setOpenDialog(true);
          setIdServiceActivar(row.original.id_service);
        }}
      >
        {row.original.frecuencia_km === 15000 ? 'Activar' : 'Desactivar'}
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

  const agregarService = () => (
    <Tooltip title="Nuevo Service" placement="right">
      <Button
        variant="contained"
        startIcon={<AddCircleIcon sx={{ height: '2rem' }} />}
        sx={{
          fontSize: {
            sm: '0.7rem',
            maxWidth: '300px',
            maxHeight: '40px',
          },
        }}
        onClick={() => {
          // console.log('Agregar service');
        }}
      >
        Nuevo Service
      </Button>
    </Tooltip>
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
        data={services}
        state={{ isLoading: loading }}
        renderTopToolbarCustomActions={agregarService}
        muiTableBodyCellProps={({ cell }) => ({ sx: { color: (cell.column.id === 'activo') && (cell.getValue() === 'activo') ? 'green' : 'red' } })}
        muiTopToolbarProps={{
          sx: {
            display: 'flex',
            flexWrap: 'inherit',
            justifyContent: 'flex-end',
            overflow: 'auto',
            maxHeight: '200px',
          },
        }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
      />

      <Popup
        title={<LittleHeader titulo="Estado de service" />}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        description="¿Está seguro que desea cambiar el estado de este service?"
      >
        <Box>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                cancelarTurno(idServiceActivar);
                setOpenDialog(false);
                setOpenSnackbar(true);
              }}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Snackbar
        message={resActivar}
        autoHideDuration={4000}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      />
      <Popup
        title={<LittleHeader titulo="Detalle de service" />}
        openDialog={openVerMas}
        setOpenDialog={setVerMas}
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setVerMas} row={rowDetalle} />
      </Popup>
    </>
  );
};

export default TablaServices;
