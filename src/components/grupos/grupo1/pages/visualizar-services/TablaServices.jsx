/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import {
  Box, Button, FormControlLabel, Switch,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import DialogActions from '@mui/material/DialogActions';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleService from './DetalleService';

import {
  getServices,
  putCambiarEstado,
} from '../../services/services-services';
import DetalleChecklist from './DetalleChecklist';
import AltaServiceForm from '../alta-services/AltaServices';

const TablaServices = (props) => {
  const { idSupervisor } = props;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // abre popup de confirmar cambiar estado service
  const [openDialog, setOpenDialog] = useState(false);

  const [openVerMas, setVerMas] = useState(false);
  const [rowDetalle, setRowDetalle] = useState({});

  const [resActivar, setResActivar] = useState([]);
  const [idServiceActivar, setIdServiceActivar] = useState(0);
  const [activeStates, setActiveStates] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);

  // Para abrir el formulario de asignacion
  const [serviceId, setServiceId] = useState({});
  const [openChecklist, setOpenChecklist] = useState(false);

  // Para abrir alta de service
  const [openAltaService, setOpenAltaService] = useState(false);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const respuestaExistosa = `La modificación del estado del service ${idServiceActivar} fue exitoso.`;

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
      }, /*
      {
        accessorKey: 'activo',
        header: 'Activo',

        Cell: ({ cell }) => (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
          >
            <p style={{
              backgroundColor: cell.getValue() === true ? 'rgb(53, 122, 56)' : '#b71c1c',
              padding: '0.4rem',
              margin: '0px',
              borderRadius: '5px',
              width: '6.5rem',
              textAlign: 'center',
              color: 'white',
            }}
            >
              {cell.getValue() === true ? 'Activo' : 'No activo'}
            </p>
          </span>
        ),
      }, */
    ],
    [],
  );

  const traerServices = useCallback(() => {
    getServices()
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
      traerServices();
      setActualizarTabla(false); // Reiniciar el estado de actualizarTabla
      setAlertType('');
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error al traer los services. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
  }, [traerServices, actualizarTabla]);

  const activarService = (idService) => {
    putCambiarEstado(idService)
      .then((response) => {
        setResActivar(respuestaExistosa);
        // Para actualizar la tabla despues de activar o desactivar un service
        setActiveStates((prevActiveStates) => ({
          ...prevActiveStates,
          [idService]: !prevActiveStates[idService],
        }));
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

  const handleChange = (event, idService) => {
    setIdServiceActivar(idService);
    setActiveStates((prevActiveStates) => ({
      ...prevActiveStates,
      [idService]: event.target.checked,
    }));
    setOpenDialog(true);
  };

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.3rem' }}
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
        Ver más
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontSize: '0.7em' }}
        size="small"
        onClick={() => {
          setOpenChecklist(true);
          setServiceId(row.original.id_service);
        }}
      >
        Checklist
      </Button>
      <FormControlLabel
        value="top"
        control={(
          <Switch
            size="small"
            sx={{
              '& .MuiSwitch-thumb': {
                bgcolor: row.original.activo === false ? '#b71c1c' : 'rgb(53, 122, 56)',
              },
            }}
            onChange={(event) => handleChange(event, row.original.id_service)}
              // setOpenDialog(true);
              // setIdServiceActivar(row.original.id_service);
            checked={row.original.activo}
          />
)}
        label={(
          <span style={{ fontSize: '0.7em' }}>
            {row.original.activo === false ? 'Inactivo' : 'Activo'}
          </span>
)}
        labelPlacement="top"
      />
      {/* <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ fontSize: '0.7em' }}
        onClick={() => {
          setOpenDialog(true);
          setIdServiceActivar(row.original.id_service);
        }}
      >
        {row.original.activo === false ? 'Activar' : 'Desactivar'}
      </Button> */}
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
          setOpenAltaService(true);
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
        initialState={{
          density: 'compact',
          sorting: [{
            id: 'id_service',
            desc: false,
          },
          ],
        }}
        localization={MRT_Localization_ES}
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100, size: 30 }}
        muiTableHeadCellProps={{ align: 'center' }}
        muiTableBodyCellProps={{ align: 'center' }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
      />

      <Popup
        title={<LittleHeader titulo="Estado de service" />}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        description="¿Está seguro que desea cambiar el estado de este service?"
        disableBackdropClick
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                activarService(idServiceActivar);
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
        message={<span>{resActivar}</span>}
        autoHideDuration={4000}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      />
      <Popup
        title={<LittleHeader titulo="Detalle de service" />}
        openDialog={openVerMas}
        setOpenDialog={setVerMas}
        disableBackdropClick
      >
        <DetalleService openDialog={openVerMas} setOpenDialog={setVerMas} row={rowDetalle} />
      </Popup>
      <Popup
        title={<LittleHeader titulo="Checklist de service" />}
        openDialog={openChecklist}
        setOpenDialog={setOpenChecklist}
        disableBackdropClick
      >
        <DetalleChecklist
          open={openChecklist}
          setOpen={setOpenChecklist}
          serviceId={serviceId}
        />
      </Popup>
      <Popup
        title={(
          <LittleHeader
            titulo="Alta de service"
            subtitulo="Formulario"
          />
)}
        openDialog={openAltaService}
        setOpenDialog={setOpenAltaService}
        description={(
          <p>
            Al realizar el alta de un service tenga en cuenta que no se puede modificar posteriormente.
            Por favor, seleccione las tareas del service de manera sensata.
          </p>
        )}
        disableBackdropClick
      >
        <AltaServiceForm
          setOpenAltaService={setOpenAltaService}
          setActualizarTabla={setActualizarTabla}
          idSupervisor={idSupervisor}
        />
      </Popup>
    </>
  );
};

export default TablaServices;
