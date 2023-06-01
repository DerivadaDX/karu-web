import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ValidarKm from '../turnos/Helpers/validar-km';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';

const AltaServiceForm = () => {
  // Para mostrar en la pantalla lo que pone el cliente
  const [kilometros, setKilometros] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  // Para crear el turno, redondeado
  const [frecuenciaKm, setFrecuenciaKM] = useState('');
  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);

  // Para validar el km
  const [isKmValido, setIsKmValido] = useState(true);

  const msjTurnoCreado = `Se ha creado un service de ${frecuenciaKm} kilómetros para la marca ${marca} y modelo ${modelo}.`;

  // Para el manejo de errores de la API para crear el turno
  const [openError, setOpenError] = useState(false);
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  // Para traer los datos de la CHECKLIST
  const [checklistData, setChecklistData] = useState('');
  // Debería tener los ítems seleccionados de la checklist
  const [selectedItems, setSelectedItems] = useState(null);
  // Fin de datos para CHECKLIST

  const guardarKilometraje = (e) => {
    const val = e.target.value;

    if (e.target.validity.valid) {
      if (ValidarKm.isKilometroValid(val)) {
        setIsKmValido(true);
      } else {
        setIsKmValido(false);
      }
      if (ValidarKm.isKmNros(val)) {
        setKilometros(val);
        const km = ValidarKm.redondearKm(val);
        setFrecuenciaKM(km);
      }
    } else if (val === '') {
      setKilometros(val);
    }
  };

  const isLetras = (text) => {
    const pattern = /^[A-Za-z]+$/;
    return pattern.test(text);
  };

  const guardarMarca = (e) => {
    const val = e.target.value;

    if (e.target.validity.valid) {
      if (isLetras(val)) {
        setMarca(val);
      }
    } else if (val === '') {
      setMarca(val);
    }
  };

  const guardarModelo = (e) => {
    const val = e.target.value;

    if (e.target.validity.valid) {
      if (isLetras(val)) {
        setModelo(val);
      }
    } else if (val === '') {
      setModelo(val);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        marca && modelo && frecuenciaKm && isKmValido) {
        // await axios({
        //   method: 'post',
        //   url: 'https://autotech2.onrender.com/turnos/crear-turno-service/',
        //   data: {
        //     patente: patenteTurno,
        //     fecha_inicio: fecha,
        //     hora_inicio: hora,
        //     frecuencia_km: frecuenciaKm,
        //     taller_id: taller,
        //   },
        // });
        setOpenPopupSeleccion(true);
      } else {
        setOpenPopupNoSeleccion(true);
      }
    } catch (error) {
      if (error.response.data.includes('la patente ingresada ya tiene un turno de ese tipo registrado en el sistema')) {
        setOpenError(true);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un problema');
        setAlertMensaje('Ya existe un turno para esa patente y tipo de turno.');
      } else {
        setOpenError(true);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un error');
        setAlertMensaje('Si el problema persiste, comuniquese con insomnia.front@gmail.com');
      }
    }
  };

  // Para la CHECKLIST
  // eslint-disable-next-line consistent-return
  const fetchChecklistData = async () => {
    try {
      const response = await axios.get(
        'https://autotech2.onrender.com/service/listar/checklist/',
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch checklist data from API
    fetchChecklistData()
      .then((data) => {
        if (typeof data === 'object' && Array.isArray(data.checklist)) {
          const rows = data.checklist.map((item) => ({
            id: item.id_task,
            elemento: item.elemento,
            tarea: item.tarea,
            costo: item.costo_reemplazo,
            duracion: item.duracion_reemplazo,
            selected: false,
          }));
          setChecklistData(rows);
        } else {
          console.error('Invalid tecnicos data format:', data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRowSelected = (rowData) => {
    const selectedItemId = rowData.row.id;
    const selItem = checklistData.find(
      (item) => item.id === selectedItemId,
    );
    setSelectedItems(selItem);
  };

  const guardarItemsSeleccionados = () => {
    // Acá tengo que ver para pasar una lista o un json de todos los ítems seleccionados
    if (selectedItems) {
      const idTecnico = selectedItems.id;
      const urlAsignarTecnico = `https://autotech2.onrender.com/turnos/asignar-tecnico/${idTecnico}/`;

      axios
        .post(urlAsignarTecnico)
        .then(() => {
          console.log('Técnico asignado:', selectedItems.id);
          setOpenPopupSeleccion(true);
        });
      // .catch((error) => {
      //   setMsjError(error.response.data);
      // });
    } else {
      setOpenPopupNoSeleccion(true);
    }
  };
  // Termina lo de la CHECKLIST

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 5 }}>
            Alta de Service
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={marca}
              id="marca"
              label="Marca"
              name="marca"
              type="text"
              pattern="^[A-Za-z]+$"
              onChange={guardarMarca}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={modelo}
              id="modelo"
              label="Modelo"
              name="modelo"
              type="text"
              pattern="^[A-Za-z]+$"
              onChange={guardarModelo}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={kilometros}
              id="kilometraje"
              label="Kilometraje"
              name="kilometraje"
              type="tel"
              pattern="[1-9][0-9]*"
              inputProps={{ maxLength: 6 }}
              onChange={guardarKilometraje}
            />
            {!isKmValido && <Alerts alertType="warning" description="Coberturas válidas: de 5000 a 200000 km." title="Kilometraje inválido" />}
            {/* eslint-disable-next-line max-len */}
            {/* {msjError && <Alerts alertType="error" description={msjError} title="No se encontró service." />} */}
          </Box>
          <Popup
            title="Error en datos requeridos."
            description="Por favor complete todos los campos y verifique la correctitud del DNI, la patente y el kilometraje."
            openDialog={openPopupNoSeleccion}
            setOpenDialog={setOpenPopupNoSeleccion}
          >
            <Box
              sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
            >
              <Button
                color="error"
                onClick={() => setOpenPopupNoSeleccion(false)}
              >
                Cerrar
              </Button>
            </Box>
          </Popup>
          <Popup
            title="Turno reservado con éxito."
            description={msjTurnoCreado}
            openDialog={openPopupSeleccion}
            setOpenDialog={setOpenPopupSeleccion}
          >
            <Box
              sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
            >
              <Button
                color="success"
                onClick={() => setOpenPopupSeleccion(false)}
              >
                Cerrar
              </Button>
            </Box>
          </Popup>
          {/* Popup para mostrar mensaje de error, cuando sea enviado el turno */}
          <Popup
            openDialog={openError}
            setOpenDialog={setOpenError}
            title="Ha ocurrido un problema"
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Alerts alertType={alertError} description={alertMensaje} title={alertTitulo} />
            </Box>
          </Popup>
        </Box>
      </Paper>
      {/* ACÁ empieza lo nuevo para agregar la checklist */}
      <EnhancedTableToolbar titulo="Checklist" />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={checklistData}
          columns={[
            { field: 'id', headerName: 'ID', width: 170 },
            { field: 'nombre', headerName: 'Nombre', width: 380 },
            { field: 'dni', headerName: 'DNI', width: 230 },
            { field: 'categoria', headerName: 'Categoría', width: 230 },
            { field: 'taller', headerName: 'Taller', width: 130 },
          ]}
          disableMultipleSelection
          checkboxSelection={false}
          onRowClick={(rowData) => handleRowSelected(rowData)}
          // Set the selected item ID as the selectionModel
          selectionModel={selectedItems ? [selectedItems.id] : []}
          pageSize={5}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ fontSize: '1em', marginTop: '10px', margin: '10px' }}
            onClick={() => {
              guardarItemsSeleccionados();
            }}
          >
            Guardar
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ fontSize: '1em', margin: '10px' }}
          >
            Cancelar
          </Button>
        </Box>
        {/* eslint-disable-next-line max-len */}
        {/* msjError && <Alerts alertType="error" description={msjError} title="No se puede asignar." /> */}
        <Popup
          title="Error en Asignación"
          description="No ha seleccionado un técnico. Por favor, seleccione uno antes de terminar con el proceso."
          openDialog={openPopupNoSeleccion}
          setOpenDialog={setOpenPopupNoSeleccion}
        >
          <Box
            sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              color="error"
              onClick={() => setOpenPopupNoSeleccion(false)}
            >
              Aceptar
            </Button>
          </Box>
        </Popup>
        <Popup
          title="Asignación completada"
          description="La asignación del turno al técnico correspondiente ha sido exitosa."
          openDialog={openPopupSeleccion}
          setOpenDialog={setOpenPopupSeleccion}
        >
          <Box
            sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
          >
            <Button>Aceptar</Button>
          </Box>
        </Popup>
        {/* Hasta acá es lo nuevo para agregar la checklist */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear Service
        </Button>
      </div>
    </Container>
  );
};

// eslint-disable-next-line react/prop-types
const EnhancedTableToolbar = ({ titulo }) => (
  <Toolbar>
    <Typography
      sx={{ flex: '1 1 100%' }}
      color="inherit"
      variant="subtitle1"
      component="div"
    />
    <Typography
      sx={{ flex: '1 0.7 100%', justifyContent: 'center' }}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      {titulo}
    </Typography>
  </Toolbar>
);

export default AltaServiceForm;
