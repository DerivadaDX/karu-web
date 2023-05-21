import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
  Button, Checkbox, Dialog, DialogActions, DialogTitle, Paper, Stack,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import SucursalService from '../services/sucursal-service';

const CrearSucursal = () => {
  const [creacionExitosaPopup, setCreacionExitosaPopup] = useState(false);
  const [nombre, setNombre] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [poseeTaller, setPoseeTaller] = useState(false);
  const [data, setData] = useState({});

  const crearSucursal = (e) => {
    e.preventDefault();
    const sucursal = {
      nombre,
      calle,
      numero,
      codigo_postal: codigoPostal,
      localidad,
      provincia,
      posee_taller: poseeTaller,
    };
    setData(sucursal);
  };

  useEffect(() => {
    SucursalService.crearSucursal(data)
      .then(() => setCreacionExitosaPopup(true))
      .catch(() => setCreacionExitosaPopup(false));
  }, [data]);

  const handleClose = () => {
    setCreacionExitosaPopup(false);
  };

  return (
    <div>
      <Dialog
        open={creacionExitosaPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Creación Exitosa!
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <Paper>
        <Stack
          onSubmit={(e) => crearSucursal(e)}
          component="form"
          sx={{ padding: '70px' }}
        >
          <TextField margin="dense" onChange={(event) => setNombre(event.target.value)} value={nombre} id="nombre" label="Nombre" variant="standard" required />
          <TextField margin="dense" onChange={(event) => setCalle(event.target.value)} value={calle} id="calle" label="Calle" variant="standard" required />
          <TextField margin="dense" onChange={(event) => setNumero(event.target.value)} value={numero} id="numero" type="number" label="Altura" variant="standard" required />
          <TextField margin="dense" onChange={(event) => setCodigoPostal(event.target.value)} value={codigoPostal} id="codigo_postal" type="number" label="C.P" variant="standard" required />
          <TextField margin="dense" onChange={(event) => setLocalidad(event.target.value)} value={localidad} id="localidad" label="Localidad" variant="standard" required />
          <TextField margin="dense" onChange={(event) => setProvincia(event.target.value)} value={provincia} id="provincia" label="Provincia" variant="standard" required />
          <FormControlLabel onChange={(event) => setPoseeTaller(event.target.value)} value={poseeTaller} id="posee_taller" control={<Checkbox />} label="Cuenta con taller mecánico" />

          <Button type="submit" variant="contained">Dar de alta sucursal</Button>
        </Stack>

      </Paper>
    </div>
  );
};

export default CrearSucursal;
