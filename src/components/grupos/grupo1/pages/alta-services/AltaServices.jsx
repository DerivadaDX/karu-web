/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import LittleHeader from '../../components/common/LittleHeader';

const AltaServiceForm = (props) => {
  // El id del supervisor está harcodeado pero lo recibe como prop
  const { idSupervisor, setOpenAltaService, setActualizarTabla } = props;

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

  const [costoBase, setCostoBase] = useState('');

  const msjServiceCreado = `Se ha creado un service de ${frecuenciaKm} kilómetros para ${marcaService} ${modeloService}, con un costo base de $${costoBase}.`;

  // Para el manejo de errores de la API para crear el turno
  const [openError, setOpenError] = useState(false);
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  // Para traer los datos de la CHECKLIST
  const [checklistData, setChecklistData] = useState([]);
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

  const isLetrasYNros = (text) => {
    const pattern = /^[A-Za-z0-9]+$/;
    return pattern.test(text);
  };

  const guardarMarca = (e) => {
    const val = e.target.value;

    if (e.target.validity.valid) {
      if (isLetrasYNros(val)) {
        setMarca(val);
      }
    } else if (val === '') {
      setMarca(val);
    }
  };

  const guardarModelo = (e) => {
    const val = e.target.value;

    if (e.target.validity.valid) {
      if (isLetrasYNros(val)) {
        setModelo(val);
      }
    } else if (val === '') {
      setModelo(val);
    }
  };

  const guardarCostoBase = (e) => {
    const val = e.target.value;

    if (e.target.validity.valid) {
      const pattern = /^(?=.*[1-9])\d*(?:\.\d+)?$/;
      if (pattern.test(val)) {
        const valor = parseFloat(val);
        setCostoBase(valor);
      }
    } else if (val === '') {
      setCostoBase(val);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      marcaService && modeloService && frecuenciaKm && isKmValido
      && selectedItems.length !== 0 && costoBase) {
      const idTareasEnString = JSON.stringify(selectedItems);
      await axios({
        method: 'post',
        url: 'https://autotech2.onrender.com/service/crear/',
        data: {
          marca: marcaService,
          modelo: modeloService,
          frecuencia_km: frecuenciaKm,
          costo_base: costoBase,
          id_supervisor: idSupervisor,
          id_tasks: idTareasEnString,
        },
      })
        .then(() => {
          setOpenPopupSeleccion(true);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const responseData = error.response.data.error;
            setOpenError(true);
            setAlertError('error');
            setAlertTitulo('Ha ocurrido un problema');
            setAlertMensaje(responseData);
          } else {
            setOpenError(true);
            setAlertError('error');
            setAlertTitulo('Ha ocurrido un error');
            setAlertMensaje('Si el problema persiste, comuniquese con insomnia.front@gmail.com');
          }
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
    <Container component="main" maxWidth="xxl" sx={{ mb: 10 }}>
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 1, md: 1 },
          p: { xs: 1, md: 2 },
          borderRadius: '15px',
          borderBottom: '4px solid',
          borderBottomColor: 'secondary.main',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <LittleHeader titulo="Datos básicos" />
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 2 }}>
            <TextField
              margin="dense"
              required
              // variant="standard"
              color="secondary"
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
              margin="dense"
              color="secondary"
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
            <Typography variant="p" sx={{ fontSize: 13 }} className="mb-3">
              *El kilometraje ingresado se redondeará automáticamente al múltiplo
              de 5000 más cercano. Por ejemplo, si se ingresa 1235, se tomará
              como 5000; si se ingresa 5001, se tomará como 10000; si se ingresa
              8750, se tomará como 10000; si se ingresa 13000, se tomará como 15000,
              y así sucesivamente.
            </Typography>
            <TextField
              margin="dense"
              required
              color="secondary"
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
            <Typography variant="p" sx={{ fontSize: 13 }} className="mb-3">
              *Para ingresar un número decimal, primero debe escribir todos los dígitos y por último
              ubicar el punto . donde corresponda. Notar que el punto debe estar entre dos números y
              que los dígitos a la derecha del punto han de tener al menos un dígito distinto de
              cero.
            </Typography>
            <TextField
              margin="dense"
              color="secondary"
              required
              fullWidth
              value={costoBase}
              id="costo"
              label="Costo Base"
              name="costo"
              type="float"
              pattern="/^(?=.*[1-9])\d*(?:\.\d+)?$/"
              onChange={guardarCostoBase}
            />
            {!isKmValido && <Alerts alertType="warning" description="Coberturas válidas: de 5000 a 200000 km." title="Kilometraje inválido" />}
          </Box>
          {/* Popup para mostrar mensaje de error, cuando se envíen los datos al back */}
          <Popup
            openDialog={openError}
            setOpenDialog={setOpenError}
            title={<LittleHeader titulo="Ha ocurrido un problema" />}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Alerts alertType={alertError} description={alertMensaje} title={alertTitulo} />
            </Box>
          </Popup>
        </Box>
      </Paper>
      {/* ACÁ empieza lo nuevo para agregar la checklist */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <EnhancedTableToolbar titulo={<LittleHeader titulo="Checklist" />} />
      </Box>
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
          title={<LittleHeader titulo="Error en la creación" />}
          description="Verifique haber puesto marca y modelo y un kilometraje dentro de las coberturas válidas (que van desde 5000 a 200000), además de un costo base. También asegúrese de elegir al menos un elemento de la checklist para crear el service."
          openDialog={openPopupNoSeleccion}
          setOpenDialog={setOpenPopupNoSeleccion}
          disableBackdropClick
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
          title={<LittleHeader titulo="Service creado" />}
          description={msjServiceCreado}
          openDialog={openPopupSeleccion}
          setOpenDialog={setOpenPopupSeleccion}
          disableBackdropClick
        >
          <Box
            sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              color="success"
              variant="outlined"
              // window.location.href = '/';
              onClick={() => {
                setActualizarTabla(true);
                setOpenAltaService(false);
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Popup>
        {/* Hasta acá es lo nuevo para agregar la checklist */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3, gap: '16px',
          }}
          >
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              color="secondary"
              onSubmit={handleSubmit}
            >
              Crear Service
            </Button>
            <Button
              // fullWidth
              variant="contained"
              color="primary"
              size="medium"
              // sx={{ mt: 1, mb: 2, ml: 1 }}
              onClick={() => {
                setOpenAltaService(false);
              }}
            >
              Atrás
            </Button>
          </Box>
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
