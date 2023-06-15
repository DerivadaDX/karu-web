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
  CircularProgress,
} from '@mui/material';
import {
  useState, useEffect, useMemo, React, useRef,
} from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import Slider from '@mui/material/Slider';
import Header from '../../components/common/Header';
import Alerts from '../../components/common/Alerts';
import { getChecklistEvaluaciones } from '../../services/services-checklist';
import evaluacion from './evaluacion.json';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';

const ChecklistEvaluacion = (props) => {
  const {
    idTurnoPadre, open, setOpen, actualizar, setActualizar,
  } = props;
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  // Para los popups de confirmacion y manejo de errores
  const [openNoSeleccion, setOpenNoSeleccion] = useState(false);
  const [openConfirmarEvaluacion, setOpenConfirmarEvaluacion] = useState(false);
  const [openEvaluacionEnviada, setOpenEvaluacionEnviada] = useState(false);
  const [openError, setOpenError] = useState(false);

  // Para que se mantengan seteados los valores de los sliders al cambiar de página
  const [valoresSlider, setValoresSlider] = useState({});
  evaluacion.id_turno = idTurnoPadre;

  const tableInstanceRef = useRef(null);

  const [valoresEvaluacion, setValoresEvaluacion] = useState({
    puntaje: 0,
    comentarios: '',
  });

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  // Alerta de la api post
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState('');
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

  const url = 'https://autotech2.onrender.com/evaluaciones/registros/crear/';
  const postEnviarEvaluacion = () => {
    axios.post(url, evaluacion)
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
        setAlertMensaje(`${mensajeError}`);
        setAlertError('error');
        setOpenConfirmarEvaluacion(false);
        setLoadingButton(false);
        setOpenError(true);
      });
  };

  async function handleSubmit(event) {
    postEnviarEvaluacion();
  }

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
  // Controla que todas las filas hayan sido seleccionadas, si hay alguna sin seleccionar
  // Se abrirá un popup explicando que hay filas sin seleccionar
  const handleCheckAllRows = () => {
    const isAllRowsSelected = tableInstanceRef.current?.getIsAllRowsSelected();
    if (isAllRowsSelected) {
      setOpenConfirmarEvaluacion(true);
    } else {
      setOpenNoSeleccion(true);
    }
  };

  const handleChangeScore = (event, index) => {
    const nuevoValorSlider = event.target.value;
    const { name, value } = event.target;
    setValoresEvaluacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValoresSlider((prevValoresSlider) => ({
      ...prevValoresSlider,
      [index]: nuevoValorSlider,
    }));
    evaluacion.id_task_puntaje[index] = value;
  };

  const handleChangeComment = (event) => {
    const { name, value } = event.target;
    setValoresEvaluacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    evaluacion.detalle = value;
  };

  const renderRowActions = ({ row }) => {
    const valorSlider = valoresSlider[row.original.id_task] || 0;
    return (
      <Box
        style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
        sx={{ height: '3.5em', marginLeft: '0.2rem', marginRight: '0.2rem' }}
      >
        <Slider
          aria-label="Puntaje máximo"
          size="small"
          valueLabelDisplay="on"
          value={valorSlider}
          step={5}
          min={0}
          max={row.original.puntaje_max}
          className="pt-5"
          color="secondary"
          onChange={(event) => handleChangeScore(event, row.original.id_task)}
        />
      </Box>
    );
  };

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
          enableRowSelection
          positionActionsColumn="last"
          enableRowActions
          renderRowActions={renderRowActions}
          localization={MRT_Localization_ES}
          muiTableBodyCellProps={{ align: 'center' }}
          muiTableHeadCellProps={{ align: 'center' }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Puntaje',
            },
            'mrt-row-select': {
              header: 'Evaluado',
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
          muiSelectCheckboxProps={{
            color: 'secondary',
          }}
          tableInstanceRef={tableInstanceRef}
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
            handleCheckAllRows();
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
        title={<LittleHeader titulo="Checklist incompleta" />}
        openDialog={openNoSeleccion}
        setOpenDialog={setOpenNoSeleccion}
        description="No ha seleccionado todas las checkboxes correspondientes. Por favor, verifique que haya revisado todas las tareas para registrar la evaluación."
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

      {/* Popup cuando estan todas las rows seleccionadas para confirmar evaluacion */}
      <Popup
        title={<LittleHeader titulo="Evaluación Terminada" />}
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
              disabled={loadingButton}
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

export default ChecklistEvaluacion;
