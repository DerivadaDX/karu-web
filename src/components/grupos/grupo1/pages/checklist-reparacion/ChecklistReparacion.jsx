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
  TextField,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import {
  useState, useEffect, useMemo, React,
} from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import Alerts from '../../components/common/Alerts';
import { getChecklistReparacion, getRegistroReparacion } from '../../services/services-checklistReparacion';
// import reparacion from './reparacion.json';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';

const ChecklistReparacion = (props) => {
  const {
    idTurnoPadre, setOpen, open, actualizar, setActualizar,
  } = props;
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [openNoSeleccion, setOpenNoSeleccion] = useState(false);
  const [openConfirmarReparacion, setOpenConfirmarReparacion] = useState(false);
  const [openReparacionEnviada, setOpenReparacionEnviada] = useState(false);

  const [estadoAnteriorChecklist, setEstadoAnteriorChecklist] = useState([]);
  const [estadoChecklist, setEstadoChecklist] = useState({});
  const [comentario, setComentario] = useState('');

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
      },
      {
        accessorKey: 'duracion_reemplazo',
        header: 'Duración en minutos',
      },
    ],
    [],
  );

  const getChecklist = () => {
    getChecklistReparacion(idTurnoPadre)
      .then((response) => {
        setReparaciones(response.data);
        setLoading(false);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage(error.response.data.error);
        setAlertType('error');
        setAlertTitle('Ha ocurrido un problema');
      });
  };

  const getEstadoChecklist = () => {
    getRegistroReparacion(idTurnoPadre)
      .then((response) => {
        setEstadoChecklist(response.data.tasks);
        setEstadoAnteriorChecklist(response.data);
        setComentario(response.data.detalle);
        setLoading(false);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage(error.response.data.error);
        setAlertType('error');
        setAlertTitle('Ha ocurrido un problema');
      });
  };

  const urlTareaHecha = 'https://autotech2.onrender.com/reparaciones/modificar-tareas-hechas/';
  const patchTareaHecha = (idTask) => {
    axios.patch(urlTareaHecha, {
      id_turno: idTurnoPadre,
      id_task: idTask.toString(),
    })
      .then(() => {
      })
      .catch(() => {
        setAlertMensaje('Ha ocurrido un error.');
        setAlertError('error');
        setAlertTitulo('Error de servidor');
      });
  };

  const urlTareaPendiente = 'https://autotech2.onrender.com/reparaciones/modificar-tareas-pendientes/';
  const patchTareaPendiente = (idTask) => {
    axios.patch(urlTareaPendiente, {
      id_turno: idTurnoPadre,
      id_task: idTask.toString(),
    })
      .then(() => {
      })
      .catch(() => {
        setAlertMensaje('Ha ocurrido un error.');
        setAlertError('error');
        setAlertTitulo('Error de servidor');
      });
  };

  const urlComentario = 'https://autotech2.onrender.com/reparaciones/modificar-detalle-reparacion/';
  const patchModificarComentario = (detalleReparacion) => {
    axios.patch(urlComentario, {
      id_turno: idTurnoPadre,
      detalle: detalleReparacion,
    })
      .then(() => {
      })
      .catch(() => {
        setAlertMensaje('Ha ocurrido un error.');
        setAlertError('error');
        setAlertTitulo('Error de servidor');
      });
  };

  const handleChangeComment = (event) => {
    const { value } = event.target;
    setComentario(value);
    patchModificarComentario(value);
  };

  const handleChangeCheckbox = (event, idTask) => {
    const { checked } = event.target;

    if (checked) {
      patchTareaHecha(idTask);
      setEstadoChecklist((prevState) => ({ ...prevState, [idTask]: true }));
    } else {
      patchTareaPendiente(idTask);
      setEstadoChecklist((prevState) => ({ ...prevState, [idTask]: false }));
    }
  };

  const renderRowActions = ({ row }) => {
    const isSelected = estadoChecklist[row.original.id_task] === true;
    return (
      <Box
        style={{
          display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'center',
        }}
        sx={{ height: '3.5em', marginLeft: '0.2rem', marginRight: '0.2rem' }}
      >
        <Checkbox
          color="secondary"
          checked={isSelected}
          onChange={(event) => handleChangeCheckbox(event, row.original.id_task)}
        />
      </Box>
    );
  };

  const isAllCheckboxesSelected = () => {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in estadoChecklist) {
      if (!estadoChecklist[key]) {
        return false;
      }
    }
    return true;
  };

  const handleCheckAllRows = () => {
    const allSelected = isAllCheckboxesSelected();

    if (allSelected) {
      setOpenConfirmarReparacion(true);
    } else {
      setOpenNoSeleccion(true);
    }
  };

  const urlReparacionTerminada = `https://autotech2.onrender.com/reparaciones/finalizar/${idTurnoPadre}/`;
  const patchEnviarReparacion = () => {
    axios.patch(urlReparacionTerminada)
      .then(() => {
        setOpenReparacionEnviada(true);
        setActualizar(true);
        setLoadingButton(false);
      })
      .catch((error) => {
        const mensajeError = error.response.data.error;
        setOpenConfirmarReparacion(false);
        setOpenError(true);
        setAlertMensaje(`${mensajeError}`);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un problema');
        setLoadingButton(false);
      });
  };

  async function handleSubmit() {
    patchEnviarReparacion();
  }

  useEffect(() => {
    getChecklist();
    getEstadoChecklist();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alerts alertType={alertType} description={alertMessage} title={alertTitle} />
      </Box>

      <Divider sx={{ color: 'silver' }} />

      <Container maxWidth="xxl" sx={{ mb: 1 }}>
        <MaterialReactTable
          columns={columnas}
          data={reparaciones}
          state={{ isLoading: loading }}
          enableToolbarInternalActions={false}
          positionActionsColumn="last"
          enableRowActions
          renderRowActions={renderRowActions}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
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
              header: 'Reparación hecha',
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

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            id="standard-multiline-static"
            placeholder="Comentario"
            value={comentario}
            multiline
            rows={5}
            variant="outlined"
            color="secondary"
            sx={{ width: '90rem', mt: 1 }}
            onChange={handleChangeComment}
          />
        </Box>
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
            handleCheckAllRows();
          }}
        >
          Terminar reparación
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
        title={<LittleHeader titulo="Checklist incompleta" />}
        openDialog={openNoSeleccion}
        setOpenDialog={setOpenNoSeleccion}
        description="No ha seleccionado todas las checkboxes correspondientes. Por favor, verifique que haya completado todas las tareas para terminar la reparación."
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
                setOpenNoSeleccion(false);
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Box>
      </Popup>

      {/* Popup cuando estan todas las rows seleccionadas para confirmar reparación */}
      <Popup
        title={<LittleHeader titulo="Terminar reparación" />}
        openDialog={openConfirmarReparacion}
        setOpenDialog={setOpenConfirmarReparacion}
        description="¿Está seguro que desea terminar la reparación? No se podrá modificar una vez terminada."
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
                setOpenConfirmarReparacion(false);
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Popup>

      {/* Popup para mostrar mensaje de error, cuando sea enviado el turno */}
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
        title={<LittleHeader titulo="Reparación guardada exitosamente." />}
        openDialog={openReparacionEnviada}
        setOpenDialog={setOpenReparacionEnviada}
        description="Se han guardado las reparaciones hechas."
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

export default ChecklistReparacion;
