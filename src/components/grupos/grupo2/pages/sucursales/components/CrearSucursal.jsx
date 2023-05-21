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
            sx={{ paddingX: '70px', paddingY: '50px' }}
          >
            <TextField
              id="nombre"
              value={nombre}
              label="Nombre"
              onChange={(event) => setNombre(event.target.value)}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="calle"
              value={calle}
              label="Calle"
              onChange={(event) => setCalle(event.target.value)}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="numero"
              value={numero}
              label="Altura"
              onChange={(event) => setNumero(event.target.value)}
              variant="standard"
              margin="dense"
              type="number"
              required
            />
            <TextField
              id="codigo_postal"
              value={codigoPostal}
              label="C.P."
              onChange={(event) => setCodigoPostal(event.target.value)}
              variant="standard"
              margin="dense"
              type="number"
              required
            />
            <TextField
              id="localidad"
              value={localidad}
              label="Localidad"
              onChange={(event) => setLocalidad(event.target.value)}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="provincia"
              value={provincia}
              label="Provincia"
              onChange={(event) => setProvincia(event.target.value)}
              variant="standard"
              margin="dense"
              required
            />
            <FormControlLabel
              id="posee_taller"
              value={poseeTaller}
              label="Cuenta con taller mecánico"
              onChange={(event) => setPoseeTaller(event.target.checked)}
              control={<Checkbox />}
              sx={{ marginTop: '2ch' }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: '2ch' }}
            >
              Crear
            </Button>
          </Stack>
        </Paper>
      </Dialog>
    </Box>
  );
};

export default CrearSucursal;
