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
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import SucursalService from '../services/sucursal-service';

const ModificarSucursal = ({ sucursalRow, onEdit }) => {
  const [mostrarPopUpModificarSucursal, setMostrarPopUpModificarSucursal] = useState(false);
  const [mostrarPopUpModificacionExitosa, setMostrarPopUpModificacionExitosa] = useState(false);

  const [nombre, setNombre] = useState(sucursalRow.nombre || '');
  const [calle, setCalle] = useState(sucursalRow.calle || '');
  const [numero, setNumero] = useState(sucursalRow.numero || '');
  const [codigoPostal, setCodigoPostal] = useState(sucursalRow.codigo_postal || '');
  const [localidad, setLocalidad] = useState(sucursalRow.localidad || '');
  const [provincia, setProvincia] = useState(sucursalRow.provincia || '');
  const [poseeTaller, setPoseeTaller] = useState(true);
  const [activa, setActiva] = useState(true);

  const [datosSucursal, setDatosSucursal] = useState({});

  const cambiarVisibilidadPopUpModificarSucursal = () => {
    setMostrarPopUpModificarSucursal(!mostrarPopUpModificarSucursal);
  };

  const cambiarVisibilidadPopUpModificacionExitosa = () => {
    setMostrarPopUpModificacionExitosa(false);
    setMostrarPopUpModificarSucursal(false);
    onEdit();
  };

  const modificarSucursal = (evento) => {
    evento.preventDefault();

    const sucursal = {
      // eslint-disable-next-line object-shorthand
      nombre: nombre,
      // eslint-disable-next-line object-shorthand
      calle: calle,
      // eslint-disable-next-line object-shorthand
      numero: numero,
      // eslint-disable-next-line object-shorthand
      codigo_postal: codigoPostal,
      // eslint-disable-next-line object-shorthand
      localidad: localidad,
      // eslint-disable-next-line object-shorthand
      provincia: provincia,
      posee_taller: poseeTaller,
      // eslint-disable-next-line object-shorthand
      activa: activa,
    };

    setDatosSucursal(sucursal);
  };

  useEffect(() => {
    SucursalService.modificarSucursal(sucursalRow.id, datosSucursal)
      .then(() => setMostrarPopUpModificacionExitosa(true))
      .catch(() => setMostrarPopUpModificacionExitosa(false));
  }, [datosSucursal]);

  return (
    <Box>
      <Tooltip title="Editar">
        <IconButton onClick={cambiarVisibilidadPopUpModificarSucursal}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={mostrarPopUpModificarSucursal}
        onClose={cambiarVisibilidadPopUpModificarSucursal}
      >
        <Dialog
          open={mostrarPopUpModificacionExitosa}
          onClose={cambiarVisibilidadPopUpModificacionExitosa}
        >
          <DialogTitle id="alert-dialog-title">
            Creación Exitosa!
          </DialogTitle>
          <DialogActions>
            <Button onClick={cambiarVisibilidadPopUpModificacionExitosa}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        <Paper>
          <Stack
            component="form"
            onSubmit={modificarSucursal}
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
            <FormControlLabel
              id="activa"
              value={activa}
              label="Se encuentra habilitada"
              onChange={(event) => setActiva(event.target.checked)}
              control={<Checkbox />}
              sx={{ marginTop: '2ch' }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: '2ch' }}
            >
              Confirmar
            </Button>
          </Stack>
        </Paper>
      </Dialog>
    </Box>
  );
};

ModificarSucursal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sucursalRow: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ModificarSucursal;
