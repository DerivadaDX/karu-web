import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';

import SucursalService from '../services/sucursal-service';

const ModificarSucursal = ({ sucursal, onEdit }) => {
  const [mostrarPopUpModificarSucursal, setMostrarPopUpModificarSucursal] = useState(false);
  const [mostrarPopUpModificacionExitosa, setMostrarPopUpModificacionExitosa] = useState(false);

  const [nombre, setNombre] = useState(sucursal.nombre || '');
  const [calle, setCalle] = useState(sucursal.calle || '');
  const [numero, setNumero] = useState(sucursal.numero || '');
  const [codigoPostal, setCodigoPostal] = useState(sucursal.codigo_postal || '');
  const [localidad, setLocalidad] = useState(sucursal.localidad || '');
  const [provincia, setProvincia] = useState(sucursal.provincia || '');
  const [poseeTaller, setPoseeTaller] = useState(sucursal.posee_taller || false);
  const [activa, setActiva] = useState(sucursal.activa || false);

  const modificarSucursal = (evento) => {
    evento.preventDefault();

    const datosSucursal = {
      nombre,
      calle,
      numero,
      codigo_postal: codigoPostal,
      localidad,
      provincia,
      posee_taller: poseeTaller,
      activa,
    };

    SucursalService.modificarSucursal(sucursal.id, datosSucursal)
      .then(() => setMostrarPopUpModificacionExitosa(true));
  };

  const recargarData = () => {
    setNombre(sucursal.nombre);
    setCalle(sucursal.calle);
    setNumero(sucursal.numero);
    setCodigoPostal(sucursal.codigo_postal);
    setProvincia(sucursal.provincia);
    setLocalidad(sucursal.localidad);
    setPoseeTaller(sucursal.posee_taller);
    setActiva(sucursal.activa);
  };

  const cerrarComponente = () => {
    setMostrarPopUpModificacionExitosa(false);
    setMostrarPopUpModificarSucursal(false);
    onEdit();
  };

  return (
    <Box>
      <Tooltip title="Editar">
        <IconButton onClick={() => setMostrarPopUpModificarSucursal(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={mostrarPopUpModificarSucursal}
        onClose={() => {
          setMostrarPopUpModificarSucursal(false);
          recargarData();
        }}
      >
        <Dialog
          open={mostrarPopUpModificacionExitosa}
          onClose={cerrarComponente}
        >
          <DialogTitle id="alert-dialog-title">
            Modificacion Exitosa!
          </DialogTitle>
          <DialogActions>
            <Button onClick={cerrarComponente}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        <Paper>
          <DialogTitle
            sx={{ textAlign: 'center', fontSize: '2rem' }}
          >
            Modificar Sucursal
          </DialogTitle>
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
              label="Taller Mecánico"
              labelPlacement="start"
              control={(
                <Switch
                  checked={poseeTaller}
                  onChange={(event) => setPoseeTaller(event.target.checked)}
                  disabled={sucursal.posee_taller}
                />
              )}
              sx={{ marginTop: '2ch', justifyContent: 'space-between', marginLeft: '0ch' }}
            />
            <FormControlLabel
              id="activa"
              value={activa}
              label="Habilitada"
              labelPlacement="start"
              control={(
                <Switch
                  checked={activa}
                  onChange={(event) => setActiva(event.target.checked)}
                />
              )}
              sx={{ marginTop: '2ch', justifyContent: 'space-between', marginLeft: '0ch' }}
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
  sucursal: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    calle: PropTypes.string,
    localidad: PropTypes.string,
    provincia: PropTypes.string,
    numero: PropTypes.number,
    codigo_postal: PropTypes.string,
    posee_taller: PropTypes.bool,
    activa: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ModificarSucursal;
