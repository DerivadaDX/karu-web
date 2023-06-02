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
  // El id del supervisor está harcodeado pero lo recibe como prop
  const idSuperv = 43;

  const [kilometros, setKilometros] = useState('');
  const [marcaService, setMarca] = useState('');
  const [modeloService, setModelo] = useState('');
  // Para enviar el km redondeado
  const [frecuenciaKm, setFrecuenciaKM] = useState('');
  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);

  // Para validar el km
  const [isKmValido, setIsKmValido] = useState(true);

  const msjServiceCreado = `Se ha creado un service de ${frecuenciaKm} kilómetros para ${marcaService} ${modeloService}.`;

  // Para el manejo de errores de la API para crear el turno
  const [openError, setOpenError] = useState(false);
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  // Para traer los datos de la CHECKLIST
  const [checklistData, setChecklistData] = useState('');
  // Debería tener los ítems seleccionados de la checklist
  const [selectedItems, setSelectedItems] = useState([]);
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
    if (
      marcaService && modeloService && frecuenciaKm && isKmValido && selectedItems.length !== 0) {
      const idTareasEnString = JSON.stringify(selectedItems);
      await axios({
        method: 'post',
        url: 'https://autotech2.onrender.com/service/crear/',
        data: {
          marca: marcaService,
          modelo: modeloService,
          frecuencia_km: frecuenciaKm,
          costo_base: 7000.0,
          id_supervisor: idSuperv,
          id_tasks: idTareasEnString,
        },
      })
        .then(() => {
          setOpenPopupSeleccion(true);
        })
        .catch((error) => {
          setOpenError(true);
          setAlertError('error');
          setAlertTitulo('Ha ocurrido un error');
          setAlertMensaje(error.response.data.error);
        });
    } else {
      setOpenPopupNoSeleccion(true);
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
      setOpenError(true);
      setAlertError('error');
      setAlertTitulo('Ha ocurrido un error');
      setAlertMensaje('Si el problema persiste, comuniquese con insomnia.front@gmail.com');
      throw error;
    }
  };

  useEffect(() => {
    // Fetch checklist data from API
    fetchChecklistData()
      .then((data) => {
        if (Array.isArray(data)) {
          const rows = data.map((item) => ({
            id: item.id_task,
            elemento: item.elemento,
            tarea: item.tarea,
            costo: item.costo_reemplazo,
            duracion: item.duracion_reemplazo,
            selected: false,
          }));
          setChecklistData(rows);
        } else {
          setOpenError(true);
          setAlertError('error');
          setAlertTitulo('Ha ocurrido un error');
          setAlertMensaje('Si el problema persiste, comuniquese con insomnia.front@gmail.com');
        }
      })
      .catch((error) => {
        setOpenError(true);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un error');
        setAlertMensaje('Si el problema persiste, comuniquese con insomnia.front@gmail.com');
        throw error;
      });
  }, []);

  // const handleRowsSelected = (rowData) => {
  //   if (Array.isArray(rowData)) {
  //     setSelectedItems(rowData);
  //   }
  //   const selectedItemId = rowData.row.id;
  //   setSelectedItems((prevSelectedItems) => {
  //     if (prevSelectedItems.includes(selectedItemId)) {
  //       // Item is already selected, remove it from the selectedItems array
  //       return prevSelectedItems.filter((itemId) => itemId !== selectedItemId);
  //     }
  //     // Item is not selected, add it to the selectedItems array
  //     return [...prevSelectedItems, selectedItemId];
  //   });
  // };
  const handleRowsSelected = (rowData) => {
    if (Array.isArray(rowData)) {
      // Multiple rows selected
      setSelectedItems(rowData);
    } else if (rowData && rowData.row && rowData.row.id) {
      // Single row clicked or selected
      const selectedItemId = rowData.row.id;
      setSelectedItems((prevSelectedItems) => {
        if (prevSelectedItems.includes(selectedItemId)) {
          // Item is already selected, remove it from the selectedItems array
          return prevSelectedItems.filter((itemId) => itemId !== selectedItemId);
        }
        // Item is not selected, add it to the selectedItems array
        return [...prevSelectedItems, selectedItemId];
      });
    }
  };

  // Termina lo de la CHECKLIST

  return (
    <Container component="main" maxWidth="xxl" sx={{ mb: 20 }}>
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
              value={marcaService}
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
              value={modeloService}
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
          </Box>
          {/* Popup para mostrar mensaje de error, cuando se envíen los datos al back */}
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
            { field: 'id', headerName: 'ID', width: 10 },
            { field: 'elemento', headerName: 'Elemento', width: 580 },
            { field: 'costo', headerName: 'Costo', width: 230 },
            { field: 'duracion', headerName: 'Duracion', width: 130 },
          ]}
          checkboxSelection
          onRowSelectionModelChange={(rowSelectionModel) => handleRowsSelected(rowSelectionModel)}
          onCellClick={(rowData) => handleRowsSelected(rowData)}
          selectionModel={selectedItems}
          pageSize={5}
        />
        <Popup
          title="Error en la creación"
          description="Complete todos los campos, por favor. Y asegúrese de elegir al menos un elemento de la checklist para crear el service."
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
          title="Service creado"
          description={msjServiceCreado}
          openDialog={openPopupSeleccion}
          setOpenDialog={setOpenPopupSeleccion}
        >
          <Box
            sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              color="success"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Popup>
        {/* Hasta acá es lo nuevo para agregar la checklist */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmit}
          >
            Crear Service
          </Button>
        </Box>
      </div>
    </Container>
  );
};

// eslint-disable-next-line react/prop-types
const EnhancedTableToolbar = ({ titulo }) => (
  <Toolbar>
    <Typography
      sx={{ flex: '1 1 100%', justifyContent: 'center' }}
      align="center"
      variant="h6"
      id="tableTitle"
      component="div"
    >
      {titulo}
    </Typography>
  </Toolbar>
);

export default AltaServiceForm;