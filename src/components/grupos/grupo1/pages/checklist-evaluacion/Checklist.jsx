/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  TextField,
} from '@mui/material';
import {
  useState, useEffect, useMemo, React,
} from 'react';
import MaterialReactTable from 'material-react-table';
import Slider from '@mui/material/Slider';
import Header from '../../components/common/Header';
import Alerts from '../../components/common/Alerts';
import { getChecklistEvaluaciones, postRegistroEvaluaciones } from '../../services/services-checklist';
import evaluacion from './evaluacion.json';

const ChecklistEvaluacion = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [resError, setResError] = useState([]);
  const idTurno = 1;
  const msjErrorDefault = 'Ha ocurrido un error, disculpe las molestias. Intente nuevamente. Si el error persiste comunicarse con soporte: soporte-tecnico@KarU.com';

  const [valoresEvaluacion, setValoresEvaluacion] = useState({
    puntaje: 0,
    comentarios: '',
  });

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerChecklist = () => {
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

  const handleChangeScore = (event, index) => {
    const { name, value } = event.target;
    setValoresEvaluacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    evaluacion.id_task_puntaje[index] = value;
    evaluacion.id_turno = idTurno;
    console.log('json: ', evaluacion);
  };

  const handleChangeComment = (event) => {
    const { name, value } = event.target;
    setValoresEvaluacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    evaluacion.detalle = value;
    console.log('Comentario ', evaluacion.detalle);
  };

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.5em', marginLeft: '0.2rem', marginRight: '0.2rem' }}
    >
      <Slider
        aria-label="Puntaje máximo"
        defaultValue={0}
        size="small"
        valueLabelDisplay="auto"
        step={5}
        min={0}
        max={row.original.puntaje_max}
        className="pt-5"
        color="secondary"
        onChange={(event) => handleChangeScore(event, row.original.id_task)}
      />
    </Box>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    postRegistroEvaluaciones()
      .then((response) => {
        console.log(response.status);
        // setResCancelar(response.data);
        // setActualizarTabla(true); // Para actualizar la tabla despues de cancelar turno
      })
      .catch((error) => {
        // setResCancelar(error.message);
        console.log(error.response.status);
        setResError(error.response.data.error);
        console.log(resError);
        setAlertMessage(
          resError,
        );
        setAlertType('error');
        setAlertTitle('Error de servidor');
      });
  }

  useEffect(() => {
    traerChecklist();
  }, []);

  return (
    <>
      <Box mt="5px">
        <Box display="flex">
          <Header titulo="Evaluaciones" subtitulo="Checklist" />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alerts alertType={alertType} description={alertMessage} title={alertTitle} />
      </Box>

      <Divider sx={{ color: 'silver' }} />

      <Container maxWidth="xxl" sx={{ mb: 2 }}>
        <MaterialReactTable
          columns={columnas}
          data={evaluaciones}
          state={{ isLoading: loading }}
          enableToolbarInternalActions={false}
          enableRowSelection
          positionActionsColumn="last"
          enableRowActions
          enableSelectAll={false}
          renderRowActions={renderRowActions}
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
            required: true,
          }}
        />
      </Container>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          id="standard-multiline-static"
          placeholder="Comentarios"
          multiline
          rows={5}
          variant="outlined"
          sx={{ width: '50em' }}
          onChange={handleChangeComment}
        />
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3, ml: 1 }}
            color="secondary"
          >
            Crear evaluación
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ChecklistEvaluacion;
