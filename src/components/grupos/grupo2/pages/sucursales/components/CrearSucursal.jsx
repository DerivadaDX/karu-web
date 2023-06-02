import React, { useState } from 'react';

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
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import SucursalService from '../services/sucursal-service';

const CrearSucursal = ({ onCreate }) => {
  const [mostrarPopUpCrearSucursal, setMostrarPopUpCrearSucursal] = useState(false);
  const [mostrarPopUpCreacionExitosa, setMostrarPopUpCreacionExitosa] = useState(false);

  const [nombre, setNombre] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [poseeTaller, setPoseeTaller] = useState(false);

  const cambiarVisibilidadPopUpCrearSucursal = () => {
    setMostrarPopUpCrearSucursal(!mostrarPopUpCrearSucursal);
  };

  const cambiarVisibilidadPopUpCreacionExitosa = () => {
    setMostrarPopUpCreacionExitosa(false);
    setMostrarPopUpCrearSucursal(false);
    onCreate();
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

    SucursalService.crearSucursal(sucursal)
      .then(() => setMostrarPopUpCreacionExitosa(true));
  };

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
              inputProps={{ maxLength: 50 }}
            />
            <TextField
              id="calle"
              value={calle}
              label="Calle"
              onChange={(event) => setCalle(event.target.value)}
              variant="standard"
              margin="dense"
              required
              inputProps={{ maxLength: 50 }}
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
              onChange={(event) => setCodigoPostal(event.target.value, 20)}
              variant="standard"
              margin="dense"
              required
              inputProps={{ maxLength: 20 }}
            />
            <TextField
              id="localidad"
              value={localidad}
              label="Localidad"
              onChange={(event) => setLocalidad(event.target.value)}
              variant="standard"
              margin="dense"
              required
              inputProps={{ maxLength: 50 }}
            />
            <TextField
              id="provincia"
              value={provincia}
              label="Provincia"
              onChange={(event) => setProvincia(event.target.value)}
              variant="standard"
              margin="dense"
              required
              inputProps={{ maxLength: 50 }}
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

CrearSucursal.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CrearSucursal;
