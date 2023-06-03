/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  Alert,
  Box,
  Button,
  Container,
  DialogActions,
  Divider,
  TextField,
  Checkbox,
} from '@mui/material';
import {
  useState, useEffect, useMemo, React, useRef,
} from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import Slider from '@mui/material/Slider';
import Header from '../../components/common/Header';
import Alerts from '../../components/common/Alerts';
import { getChecklistEvaluaciones } from '../../services/services-checklist';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';

const ChecklistEvaluacion = (props) => {
  const {
    idTurnoPadre, open, setOpen, actualizar, setActualizar,
  } = props;
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resError, setResError] = useState([]);
  // Para los popups de confirmacion y manejo de errores

  const [openNoSeleccion, setOpenNoSeleccion] = useState(false);
  const [openConfirmarEvaluacion, setOpenConfirmarEvaluacion] = useState(false);
  const [openEvaluacionEnviada, setOpenEvaluacionEnviada] = useState(false);

  const [valoresEvaluacion, setValoresEvaluacion] = useState({
    tareas: [],
    comentarios: '',
  });

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

  const handleChangeComment = (event) => {
    const { name, value } = event.target;
    setValoresEvaluacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (event, idTask) => {
    const { checked } = event.target;

    if (checked) {
      valoresEvaluacion.tareas.push(idTask);
    } else {
      const index = valoresEvaluacion.tareas.indexOf(idTask);
      if (index > -1) {
        valoresEvaluacion.tareas.splice(index, 1);
      }
    }
  };

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.5em', marginLeft: '0.2rem', marginRight: '0.2rem' }}
    >
      <Checkbox
        color="secondary"
        onChange={(event) => handleChangeCheckbox(event, row.original.id_task)}
      />
    </Box>
  );

  const url = 'https://autotech2.onrender.com/evaluaciones/registro-extraordinario/crear/';
  const postEnviarEvaluacion = () => {
    axios.post(url, {
      id_turno: idTurnoPadre,
      id_task: valoresEvaluacion.tareas,
      detalle: valoresEvaluacion.comentarios,
    })
      .then(() => {
        setOpenEvaluacionEnviada(true);
        setActualizar(true);
      })
      .catch(() => {
        setAlertmensaje('Ha ocurrido un error.');
        setAlertError('error');
        setAlertTitulo('Error de servidor');
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
            setOpenConfirmarEvaluacion(true);
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

      {/* Popup cuando estan todas las rows seleccionadas para confirmar evaluacion */}
      <Popup
        title={<LittleHeader titulo="Evaluación Terminada" />}
        openDialog={openConfirmarEvaluacion}
        setOpenDialog={setOpenConfirmarEvaluacion}
        description="¿Está seguro que desea enviar la evaluación? No se podrá modificar una vez realizada."
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Alerts alertType={alertError} description={alertMensaje} title={alertTitulo} />
        </Box>
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <DialogActions>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                handleSubmit();
              }}
            >
              Enviar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenConfirmarEvaluacion(false);
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Popup>

      {/* Popup confirmando que se envio de la evaluación */}
      <Popup
        title={<LittleHeader titulo="Evaluación cargada exitosamente." />}
        openDialog={openEvaluacionEnviada}
        setOpenDialog={setOpenEvaluacionEnviada}
        description="La evaluación realizada se ha enviado existosamente."
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
