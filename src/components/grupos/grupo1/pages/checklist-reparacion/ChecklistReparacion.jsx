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
  Snackbar,
  TextField,
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
// import reparacion from './reparacion.json';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';

const ChecklistReparacion = (props) => {
  const {
    idTurnoPadre, setOpen,
  } = props;
  const [reparaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resError, setResError] = useState([]);
  // Para los popups de confirmacion y manejo de errores

  const [openNoSeleccion, setOpenNoSeleccion] = useState(false);
  const [openConfirmarEvaluacion, setOpenConfirmarEvaluacion] = useState(false);
  const [openEvaluacionEnviada, setOpenEvaluacionEnviada] = useState(false);
  // Para que se mantengan seteados los valores de los sliders al cambiar de página
  const [valoresSlider, setValoresSlider] = useState({});
  // reparacion.id_turno = idTurnoPadre;
  const tableInstanceRef = useRef(null);

  const [valoresReparacion, setValoresReparacion] = useState({

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

  const traerChecklist = () => {
    getChecklistEvaluaciones()
      .then((response) => {
        setEvaluaciones(response.data);
        setLoading(false);
        setAlertType('');
      })
      .catch(() => {
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
  // Controla que todas las filas hayan sido seleccionadas, si hay alguna sin seleccionar
  // Se abrirá un popup explicando que hay filas sin seleccionar
  const handleCheckAllRows = () => {
    const isAllRowsSelected = tableInstanceRef.current?.getIsAllRowsSelected();
    if (isAllRowsSelected) {
      console.log('Todas las filas estan seleccionadas');
      setOpenConfirmarEvaluacion(true);
    } else {
      setOpenNoSeleccion(true);
    }
  };

  /* const handleChangeScore = (event, index) => {
      const nuevoValorSlider = event.target.value;
      const { name, value } = event.target;
      setValoresReparacion((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setValoresSlider((prevValoresSlider) => ({
        ...prevValoresSlider,
        [index]: nuevoValorSlider,
      }));
      evaluacion.id_task_puntaje[index] = value;
    };
  */
  const handleChangeComment = (event) => {
    const { name, value } = event.target;
    setValoresReparacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // reparacion.detalle = value;
    // console.log('Comentario ', reparacion.detalle);
  };

  /*
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
*/
  /* const handleEnviarReparacion = () => {
      axios.post(url, reparacion)
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
  */
  async function handleSubmit() {
    // handleEnviarReparacion();
  }

  useEffect(() => {
    traerChecklist();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alerts alertType={alertType} description={alertMessage} title={alertTitle} />
      </Box>

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
          enableRowSelection
          positionActionsColumn="last"
          // enableRowActions
          // renderRowActions={renderRowActions}
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

      {/* Popup cuando estan todas las rows seleccionadas para confirmar evaluacion */}
      <Popup
        title={<LittleHeader titulo="Reparación Terminada" />}
        openDialog={openConfirmarEvaluacion}
        setOpenDialog={setOpenConfirmarEvaluacion}
        description="¿Está seguro que desea enviar la reparación? No se podrá modificar una vez realizada."
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
        title={<LittleHeader titulo="Reparación cargada exitosamente." />}
        openDialog={openEvaluacionEnviada}
        setOpenDialog={setOpenEvaluacionEnviada}
        description="La reparación realizada se ha enviado existosamente."
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
