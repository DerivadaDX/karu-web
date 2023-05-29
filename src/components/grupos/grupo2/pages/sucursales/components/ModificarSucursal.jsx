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
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

import SucursalService from '../services/sucursal-service';

const ModificarSucursal = ({ sucursal, onEdit }) => {
  const [mostrarPopUpModificarSucursal, setMostrarPopUpModificarSucursal] = useState(false);
  const [mostrarPopUpModificacionExitosa, setMostrarPopUpModificacionExitosa] = useState(false);
  const [valoresDelFormulario, setValoresDelFormulario] = useState({
    nombre: '',
    calle: '',
    numero: 0,
    localidad: '',
    provincia: '',
    codigoPostal: '',
    poseeTaller: false,
    activa: false,
  });

  const mostrarYCargarFormulario = () => {
    setMostrarPopUpModificarSucursal(true);
    setValoresDelFormulario({
      id: sucursal.id,
      nombre: sucursal.nombre,
      calle: sucursal.calle,
      numero: sucursal.numero,
      codigoPostal: sucursal.codigo_postal,
      localidad: sucursal.localidad,
      provincia: sucursal.provincia,
      poseeTaller: sucursal.posee_taller,
      activa: sucursal.activa,
    });
  };

  const cambiarVisibilidadDePopUpModificarSucursal = () => {
    setMostrarPopUpModificarSucursal(!mostrarPopUpModificarSucursal);
  };

  const cambiarVisibilidadDePopUpModificacionExitosa = () => {
    setMostrarPopUpModificacionExitosa(!mostrarPopUpModificacionExitosa);
  };

  const actualizarValorDeFormulario = (event) => {
    const { name, value, checked } = event.target;

    const cambioUnCheckbox = name === 'activa' || name === 'poseeTaller';
    const valorNuevo = cambioUnCheckbox ? checked : value;

    setValoresDelFormulario((valoresActuales) => ({
      ...valoresActuales,
      [name]: valorNuevo,
    }));
  };

  const modificarSucursal = (event) => {
    event.preventDefault();

    const datosSucursal = {
      nombre: valoresDelFormulario.nombre,
      calle: valoresDelFormulario.calle,
      numero: valoresDelFormulario.numero,
      codigo_postal: valoresDelFormulario.codigoPostal,
      localidad: valoresDelFormulario.localidad,
      provincia: valoresDelFormulario.provincia,
      posee_taller: valoresDelFormulario.poseeTaller,
      activa: valoresDelFormulario.activa,
    };

    SucursalService.modificarSucursal(sucursal.id, datosSucursal)
      .then(cambiarVisibilidadDePopUpModificacionExitosa);
  };

  const finalizarModificacion = () => {
    const nuevosDatosSucursal = {
      id: sucursal.id,
      ...valoresDelFormulario,
    };

    cambiarVisibilidadDePopUpModificacionExitosa();
    cambiarVisibilidadDePopUpModificarSucursal();
    onEdit(nuevosDatosSucursal);
  };

  return (
    <Box>
      <Tooltip title="Editar">
        <IconButton onClick={mostrarYCargarFormulario}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={mostrarPopUpModificarSucursal}
        onClose={cambiarVisibilidadDePopUpModificarSucursal}
      >
        <DialogTitle sx={{ textAlign: 'center', fontSize: '2rem' }}>
          Modificar Sucursal
        </DialogTitle>

        <Paper>
          <Stack
            component="form"
            onSubmit={modificarSucursal}
            sx={{ paddingX: '70px', paddingY: '50px' }}
          >
            <TextField
              id="nombre"
              name="nombre"
              value={valoresDelFormulario.nombre}
              label="Nombre"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="calle"
              name="calle"
              value={valoresDelFormulario.calle}
              label="Calle"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="numero"
              name="numero"
              value={valoresDelFormulario.numero}
              label="Altura"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              type="number"
              required
            />
            <TextField
              id="codigoPostal"
              name="codigoPostal"
              value={valoresDelFormulario.codigoPostal}
              label="C.P."
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              type="number"
              required
            />
            <TextField
              id="localidad"
              name="localidad"
              value={valoresDelFormulario.localidad}
              label="Localidad"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="provincia"
              name="provincia"
              value={valoresDelFormulario.provincia}
              label="Provincia"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              required
            />
            <FormControlLabel
              id="poseeTaller"
              name="poseeTaller"
              value={valoresDelFormulario.poseeTaller}
              label="¿Posee taller mecánico?"
              labelPlacement="start"
              control={(
                <Switch
                  checked={valoresDelFormulario.poseeTaller}
                  onChange={actualizarValorDeFormulario}
                  disabled={sucursal.posee_taller}
                />
              )}
              sx={{
                marginTop: '2ch',
                justifyContent: 'space-between',
                marginLeft: '0ch',
              }}
            />
            <FormControlLabel
              id="activa"
              name="activa"
              value={valoresDelFormulario.activa}
              label="¿Está habilitada?"
              labelPlacement="start"
              control={(
                <Switch
                  checked={valoresDelFormulario.activa}
                  onChange={actualizarValorDeFormulario}
                />
              )}
              sx={{
                marginTop: '2ch',
                justifyContent: 'space-between',
                marginLeft: '0ch',
              }}
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

      <Dialog
        open={mostrarPopUpModificacionExitosa}
        onClose={finalizarModificacion}
      >
        <DialogTitle id="alert-dialog-title">
          ¡Modificación exitosa!
        </DialogTitle>
        <DialogActions>
          <Button onClick={finalizarModificacion}>
            Cerrar
          </Button>
        </DialogActions>
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
