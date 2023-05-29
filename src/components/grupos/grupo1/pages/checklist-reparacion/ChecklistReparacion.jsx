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
import { getChecklistReparacion } from '../../services/services-checklistReparacion';
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
  const id = 128;

  const traerChecklist = () => {
    getChecklistReparacion(id)
      .then((response) => {
        setEvaluaciones(response.data);
        setLoading(false);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage(error.response.data.error);
        setAlertType('error');
        setAlertTitle('Error');
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

  const handleChangeComment = (event) => {
    const { name, value } = event.target;
    setValoresReparacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // reparacion.detalle = value;
    // console.log('Comentario ', reparacion.detalle);
  };

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
            handleSubmit();
          }}
        >
          Guardar
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

      {/* Popup confirmando que se envio de la evaluación */}
      <Popup
        title={<LittleHeader titulo="Reparación guardada exitosamente." />}
        openDialog={openEvaluacionEnviada}
        setOpenDialog={setOpenEvaluacionEnviada}
        description="Se ha guardado las tareas hechas."
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
