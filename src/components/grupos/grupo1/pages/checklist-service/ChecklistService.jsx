/* eslint-disable prefer-const */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import {
  Box,
  Button,
  Container,
  DialogActions,
  Divider,
  Checkbox,
  CircularProgress,
  Stack,
} from '@mui/material';
import {
  useState, useEffect, useMemo, React,
} from 'react';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import Alerts from '../../components/common/Alerts';
import {
  getChecklistService, getPrecioService,
  postCrearRegistroServices, postPrecioService,
  getPrecioService2,
} from '../../services/services-checklistService';
// import reparacion from './reparacion.json';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';

const ChecklistService = (props) => {
  const {
    idTurnoPadre, setOpen, open, actualizar, setActualizar,
  } = props;
  const idTurno = 4;

  const [services, setServices] = useState({
    tareas: [],
  });
  const [checklistService, setChecklistService] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [checkboxSeleccionada, setCheckboxSeleccionada] = useState({});

  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [openNoSeleccion, setOpenNoSeleccion] = useState(false);
  const [openConfirmarReparacion, setOpenConfirmarService] = useState(false);
  const [openServiceEnviado, setOpenServiceEnviado] = useState(false);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  // Alerta de la api post
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'elemento',
        header: 'Partes del auto',
      },
      {
        accessorKey: 'tarea',
        header: 'Tarea',
      },
      {
        accessorKey: 'costo_reemplazo',
        header: 'Costo de reemplazo (ARS$)',
        Footer: () => (
          <Stack>
            Precio total:
            <Box color="warning.main">
              <p>
                $
                {' '}
                {precioTotal.toString()}
              </p>
            </Box>
          </Stack>
        ),
      },
      {
        accessorKey: 'duracion_reemplazo',
        header: 'Duración en minutos',
      },
    ],
    [],
  );

  const getChecklist = () => {
    getChecklistService(idTurno)
      .then((response) => {
        setChecklistService(response.data);
        setLoading(false);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage(error.response.data.error);
        setAlertType('error');
        setAlertTitle('Ha ocurrido un problema');
      });
  };

  const getPrecio = () => {
    getPrecioService2(idTurno, JSON.stringify(services.tareas))
      .then((response) => {
        setPrecioTotal(response.data.precio);
        setLoading(false);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage(error.response.data.error);
        setAlertType('error');
        setAlertTitle('Ha ocurrido un problema');
      });
  };

  const postCrearRegistro = () => {
    postCrearRegistroServices({
      id_turno: idTurno,
      id_tasks_remplazadas: JSON.stringify(services.tareas),
    })
      .then((response) => {
        setOpenConfirmarService(true);
        setActualizar(true);
      })
      .catch((error) => {
        setAlertTitulo('Ha ocurrido un problema');
        setAlertMensaje(error.response.data.error);
        setAlertError('error');
      });
  };

  const handleChangeCheckbox = (event, idTask) => {
    const { checked } = event.target;

    setCheckboxSeleccionada((prevState) => ({
      ...prevState,
      [idTask]: checked,
    }));

    if (checked) {
      services.tareas.push(idTask);
    } else {
      const index = services.tareas.indexOf(idTask);
      if (index >= 0) {
        services.tareas.splice(index, 1);
      }
    }
    getPrecio();

    console.log(precioTotal);
  };

  const renderRowActions = ({ row }) => (
    <Box
      style={{
        display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'center',
      }}
      sx={{ height: '3.5em', marginLeft: '0.2rem', marginRight: '0.2rem' }}
    >
      <Checkbox
        color="secondary"
        checked={checkboxSeleccionada[row.original.id_task] || false}
        onChange={(event) => handleChangeCheckbox(event, row.original.id_task)}
      />
    </Box>
  );

  const seSeleccionoAlgunaCheckbox = () => {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in services.tareas) {
      if (services.tareas[key]) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxSelect = () => {
    const algunaSeleccionada = seSeleccionoAlgunaCheckbox();

    if (algunaSeleccionada) {
      setOpenConfirmarService(true);
    } else {
      setOpenNoSeleccion(true);
    }
  };

  async function handleSubmit() {
    postCrearRegistro();
  }

  useEffect(() => {
    getChecklist();
    console.log(precioTotal);
  }, [getPrecio()]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alerts alertType={alertType} description={alertMessage} title={alertTitle} />
      </Box>

      <Divider sx={{ color: 'silver' }} />

      <Container maxWidth="xxl" sx={{ mb: 1 }}>
        <MaterialReactTable
          columns={columnas}
          data={checklistService}
          state={{ isLoading: loading }}
          enableToolbarInternalActions={false}
          positionActionsColumn="last"
          enableRowActions
          renderRowActions={renderRowActions}
          localization={MRT_Localization_ES}
          positionPagination="top"
          initialState={{
            pagination: {
              pageSize: 5,
              pageIndex: 0,
            },
          }}
          muiTableBodyCellProps={{ align: 'center' }}
          muiTableHeadCellProps={{ align: 'center' }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Reparado/reemplazado',
            },
          }}
          muiTablePaginationProps={{
            rowsPerPageOptions: [5, 10, 20],
            showFirstButton: false,
            showLastButton: false,
            SelectProps: {
              native: true,
            },
            labelRowsPerPage: 'Número de tareas visibles',
          }}
          muiSelectCheckboxProps={{
            color: 'secondary',
          }}
        />
      </Container>

      {/* Botones que estan en la base del popup */}
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, ml: 1 }}
          color="secondary"
          onClick={() => {
            handleCheckboxSelect();
          }}
        >
          Terminar service
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, ml: 1 }}
          color="error"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cerrar
        </Button>
      </Box>

      {/* Popup para mostrar en caso de que no haya seleccionado ningun item */}
      <Popup
        title={<LittleHeader titulo="No ha seleccionado nada" />}
        openDialog={openNoSeleccion}
        setOpenDialog={setOpenNoSeleccion}
        description="No ha seleccionado ninguna tarea. Si está seguro de esto, presione 'Aceptar'; de lo contrario, vuelva a verificar."
        disableBackdropClick
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <DialogActions>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                setOpenConfirmarService(true);
                setOpenNoSeleccion(false);
              }}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenNoSeleccion(false);
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Popup>

      {/* Popup cuando estan todas las rows seleccionadas para confirmar service */}
      <Popup
        title={<LittleHeader titulo="Terminar service" />}
        openDialog={openConfirmarReparacion}
        setOpenDialog={setOpenConfirmarService}
        description="¿Está seguro que desea terminar el service? No se podrá modificar una vez terminado."
        disableBackdropClick
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <DialogActions>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Button
                color="secondary"
                variant="outlined"
                disabled={loadingButton}
                onClick={() => {
                  handleSubmit();
                  setLoadingButton(true);
                }}
              >
                Enviar
              </Button>
              {loadingButton && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
              )}
            </Box>
            <Button
              color="error"
              variant="outlined"
              disabled={loadingButton}
              onClick={() => {
                setOpenConfirmarService(false);
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Popup>

      {/* Popup para mostrar mensaje de error, cuando se envie el formulario y falle */}
      <Popup
        openDialog={openError}
        setOpenDialog={setOpenError}
        title={<LittleHeader titulo="Ha ocurrido un problema" />}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Alerts alertType={alertError} description={alertMensaje} title={alertTitulo} />
        </Box>
      </Popup>

      {/* Popup confirmando que se envio de la reparación */}
      <Popup
        title={<LittleHeader titulo="Service cargado exitosamente." />}
        openDialog={openServiceEnviado}
        setOpenDialog={setOpenServiceEnviado}
        description="Se han guardado las tareas realizadas."
        disableBackdropClick
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <DialogActions>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
    </>
  );
};

export default ChecklistService;
