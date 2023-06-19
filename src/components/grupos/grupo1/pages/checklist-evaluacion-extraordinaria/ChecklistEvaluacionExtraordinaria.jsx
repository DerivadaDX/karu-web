/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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
import { getChecklistEvaluaciones } from '../../services/services-checklist';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';

const ChecklistEvaluacionExtraordinaria = (props) => {
  const {
    idTurnoPadre, open, setOpen, actualizar, setActualizar,
  } = props;
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [checkboxSeleccionada, setCheckboxSeleccionada] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  // Para los popups de confirmacion y manejo de errores
  const [openNoSeleccion, setOpenNoSeleccion] = useState(false);
  const [openConfirmarEvaluacion, setOpenConfirmarEvaluacion] = useState(false);
  const [openEvaluacionEnviada, setOpenEvaluacionEnviada] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [valoresEvaluacion, setValoresEvaluacion] = useState({
    tareas: [],
    comentarios: '',
  });

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
    ],
    [],
  );

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  // Alerta de la api post
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertmensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  const getChecklistEvaluacion = () => {
    getChecklistEvaluaciones()
      .then((response) => {
        setEvaluaciones(response.data);
        setLoading(false);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage(
          'Ha ocurrido un error, disculpe las molestias. Intente nuevamente más tarde. Si el error persiste comunicarse con soporte: soporte-tecnico@KarU.com',
        );
        setAlertType('error');
        setAlertTitle('Error de servidor');
      });
  };

  const handleChangeComment = (event) => {
    const { name, value } = event.target;
    setValoresEvaluacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    valoresEvaluacion.comentarios = value;
  };

  const handleChangeCheckbox = (event, idTask) => {
    const { checked } = event.target;

    setCheckboxSeleccionada((prevState) => ({
      ...prevState,
      [idTask]: checked,
    }));

    if (checked) {
      valoresEvaluacion.tareas.push(idTask);
    } else {
      const index = valoresEvaluacion.tareas.indexOf(idTask);
      if (index >= 0) {
        valoresEvaluacion.tareas.splice(index, 1);
      }
    }
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
    for (const key in valoresEvaluacion.tareas) {
      if (valoresEvaluacion.tareas[key]) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxSelect = () => {
    const algunaSeleccionada = seSeleccionoAlgunaCheckbox();

    if (algunaSeleccionada) {
      setOpenConfirmarEvaluacion(true);
    } else {
      setOpenNoSeleccion(true);
    }
  };

  const url = 'https://autotech2.onrender.com/evaluaciones/registro-extraordinario/crear/';
  const postEnviarEvaluacion = () => {
    axios.post(url, {
      id_turno: idTurnoPadre,
      id_tasks: `[${valoresEvaluacion.tareas.toString()}]`,
      detalle: valoresEvaluacion.comentarios,
    })
      .then(() => {
        setOpenEvaluacionEnviada(true);
        setActualizar(true);
        setAlertType('');
        setAlertError('');
        setLoadingButton(false);
      })
      .catch((error) => {
        const mensajeError = error.response.data.error;
        setAlertTitulo('Ha ocurrido algo inesperado');
        setAlertmensaje(`${mensajeError}`);
        setAlertError('error');
        setOpenConfirmarEvaluacion(false);
        setLoadingButton(false);
        setOpenError(true);
      });
  };

  async function handleSubmit(event) {
    postEnviarEvaluacion();
  }

  useEffect(() => {
    getChecklistEvaluacion();
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
          data={evaluaciones}
          state={{ isLoading: loading }}
          enableToolbarInternalActions={false}
          positionActionsColumn="last"
          enableRowActions
          renderRowActions={renderRowActions}
          muiTableBodyCellProps={{ align: 'center' }}
          muiTableHeadCellProps={{ align: 'center' }}
          localization={MRT_Localization_ES}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Necesita reparación',
            },
          }}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
          positionPagination="top"
          initialState={{
            pagination: {
              pageSize: 5,
              pageIndex: 0,
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

        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            id="standard-multiline-static"
            placeholder="Comentarios"
            multiline
            rows={5}
            variant="outlined"
            color="secondary"
            sx={{ width: '80rem', mt: 1 }}
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
            handleCheckboxSelect();
          }}
        >
          Terminar evaluación
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
                setOpenConfirmarEvaluacion(true);
                setOpenNoSeleccion(false);
                setAlertError('');
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

      <Popup
        title={<LittleHeader titulo="Evaluación terminada" />}
        openDialog={openConfirmarEvaluacion}
        setOpenDialog={setOpenConfirmarEvaluacion}
        description="¿Está seguro que desea enviar la evaluación? No se podrá modificar una vez realizada."
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
                  setAlertError('');
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
              onClick={() => {
                setOpenConfirmarEvaluacion(false);
                setAlertError('');
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Popup>

      {/* Popup para mostrar mensaje de error, cuando sea enviada la evaluacion */}
      <Popup
        openDialog={openError}
        setOpenDialog={setOpenError}
        title={<LittleHeader titulo="Ha ocurrido un problema" />}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Alerts alertType={alertError} description={alertMensaje} title={alertTitulo} />
        </Box>
      </Popup>

      {/* Popup confirmando que se envio de la evaluación */}
      <Popup
        title={<LittleHeader titulo="Evaluación cargada exitosamente." />}
        openDialog={openEvaluacionEnviada}
        setOpenDialog={setOpenEvaluacionEnviada}
        description="La evaluación realizada se ha enviado existosamente."
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

export default ChecklistEvaluacionExtraordinaria;
