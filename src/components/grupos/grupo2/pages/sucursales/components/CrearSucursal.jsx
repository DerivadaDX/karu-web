import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SucursalService from '../services/sucursal-service';

const CrearSucursal = () => {
  const [mostrarPopUpCrearSucursal, setMostrarPopUpCrearSucursal] = useState(false);
  const [mostrarPopUpCreacionExitosa, setMostrarPopUpCreacionExitosa] = useState(false);

  const [nombre, setNombre] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [poseeTaller, setPoseeTaller] = useState(false);

  const [datosSucursal, setDatosSucursal] = useState({});

  const cambiarVisibilidadPopUpCrearSucursal = () => {
    setMostrarPopUpCrearSucursal(!mostrarPopUpCrearSucursal);
  };

  const cambiarVisibilidadPopUpCreacionExitosa = () => {
    setMostrarPopUpCreacionExitosa(false);
  };

  const crearSucursal = (evento) => {
    evento.preventDefault();

    const sucursal = {
      nombre,
      calle,
      numero,
      codigo_postal: codigoPostal,
      localidad,
      provincia,
      posee_taller: poseeTaller,
    };

    setDatosSucursal(sucursal);
  };

  useEffect(() => {
    SucursalService.crearSucursal(datosSucursal)
      .then(() => setMostrarPopUpCreacionExitosa(true))
      .catch(() => setMostrarPopUpCreacionExitosa(false));
  }, [datosSucursal]);

  return (
    <Box>
      <Button variant="contained" onClick={cambiarVisibilidadPopUpCrearSucursal}>
        <AddIcon />
        Crear sucursal
      </Button>
      <Dialog open={mostrarPopUpCrearSucursal} onClose={cambiarVisibilidadPopUpCrearSucursal}>
        <Dialog open={mostrarPopUpCreacionExitosa} onClose={cambiarVisibilidadPopUpCreacionExitosa}>
          <DialogTitle id="alert-dialog-title">
            Creación Exitosa!
          </DialogTitle>
          <DialogActions>
            <Button onClick={cambiarVisibilidadPopUpCreacionExitosa}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        <Paper>
          <Stack
            component="form"
            onSubmit={crearSucursal}
            sx={{ padding: '70px' }}
          >
            <TextField
              margin="dense"
              onChange={(event) => setNombre(event.target.value)}
              value={nombre}
              id="nombre"
              label="Nombre"
              variant="standard"
              required
            />
            <TextField
              margin="dense"
              onChange={(event) => setCalle(event.target.value)}
              value={calle}
              id="calle"
              label="Calle"
              variant="standard"
              required
            />
            <TextField
              margin="dense"
              onChange={(event) => setNumero(event.target.value)}
              value={numero}
              id="numero"
              type="number"
              label="Altura"
              variant="standard"
              required
            />
            <TextField
              margin="dense"
              onChange={(event) => setCodigoPostal(event.target.value)}
              value={codigoPostal}
              id="codigo_postal"
              type="number"
              label="C.P"
              variant="standard"
              required
            />
            <TextField
              margin="dense"
              onChange={(event) => setLocalidad(event.target.value)}
              value={localidad}
              id="localidad"
              label="Localidad"
              variant="standard"
              required
            />
            <TextField
              margin="dense"
              onChange={(event) => setProvincia(event.target.value)}
              value={provincia}
              id="provincia"
              label="Provincia"
              variant="standard"
              required
            />
            <FormControlLabel
              onChange={(event) => setPoseeTaller(event.target.checked)}
              value={poseeTaller}
              id="posee_taller"
              control={<Checkbox />}
              label="Cuenta con taller mecánico"
            />
            <Button type="submit" variant="contained">
              Dar de alta sucursal
            </Button>
          </Stack>
        </Paper>
      </Dialog>
    </Box>
  );
};

export default CrearSucursal;
