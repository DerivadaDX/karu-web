import React, { useState } from 'react';

import {
  Alert,
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
  const [bloquearDeshabilitacion, setBloquearDeshabilitacion] = useState(false);
  const [valoresDelFormulario, setValoresDelFormulario] = useState({
    nombre: '',
    calle: '',
    numero: 0,
    localidad: '',
    provincia: '',
    codigo_postal: '',
    posee_taller: false,
    activa: false,
  });

  const bloquearDeshabilitacionSiTieneTallerActivo = () => {
    SucursalService.sucursalTieneTallerActivo(sucursal.id)
      .then((response) => {
        const tieneTallerActivo = response.data.valor;
        setBloquearDeshabilitacion(tieneTallerActivo);
      })
      .catch(() => {
        setBloquearDeshabilitacion(false);
      });
  };

  const bloquearDeshabilitacionSiEsNecesario = () => {
    if (sucursal.posee_taller) {
      bloquearDeshabilitacionSiTieneTallerActivo();
    } else {
      setBloquearDeshabilitacion(false);
    }
  };

  const mostrarYCargarFormulario = () => {
    bloquearDeshabilitacionSiEsNecesario();
    setValoresDelFormulario({
      id: sucursal.id,
      nombre: sucursal.nombre,
      calle: sucursal.calle,
      numero: sucursal.numero,
      codigo_postal: sucursal.codigo_postal,
      localidad: sucursal.localidad,
      provincia: sucursal.provincia,
      posee_taller: sucursal.posee_taller,
      activa: sucursal.activa,
    });
    setMostrarPopUpModificarSucursal(true);
  };

  const cambiarVisibilidadDePopUpModificarSucursal = () => {
    setMostrarPopUpModificarSucursal(!mostrarPopUpModificarSucursal);
  };

  const cambiarVisibilidadDePopUpModificacionExitosa = () => {
    setMostrarPopUpModificacionExitosa(!mostrarPopUpModificacionExitosa);
  };

  const actualizarValorDeFormulario = (event) => {
    const { name, value, checked } = event.target;

    let valorNuevo = value;

    const cambioUnCheckbox = name === 'activa' || name === 'posee_taller';
    if (cambioUnCheckbox) {
      valorNuevo = checked;
    }

    const cambioUnCampoNumerico = name === 'numero';
    if (cambioUnCampoNumerico) {
      valorNuevo = parseInt(value, 10);
    }

    setValoresDelFormulario((valoresActuales) => ({
      ...valoresActuales,
      [name]: valorNuevo,
    }));
  };

  const modificarSucursal = (event) => {
    event.preventDefault();

    SucursalService.modificarSucursal(sucursal.id, valoresDelFormulario)
      .then(cambiarVisibilidadDePopUpModificacionExitosa);
  };

  const finalizarModificacion = () => {
    const sucursalModificada = {
      id: sucursal.id,
      ...valoresDelFormulario,
    };

    cambiarVisibilidadDePopUpModificacionExitosa();
    cambiarVisibilidadDePopUpModificarSucursal();
    onEdit(sucursalModificada);
  };

  return (
    <Box>
      <Tooltip title="Editar">
        <IconButton onClick={() => {
          mostrarYCargarFormulario();
        }}
        >
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
              inputProps={{ maxLength: 50 }}
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
              inputProps={{ maxLength: 50 }}
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
              id="codigo_postal"
              name="codigo_postal"
              value={valoresDelFormulario.codigo_postal}
              label="C.P."
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              required
              inputProps={{ maxLength: 20 }}
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
              inputProps={{ maxLength: 50 }}
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
              inputProps={{ maxLength: 50 }}
            />
            <FormControlLabel
              id="posee_taller"
              name="posee_taller"
              value={valoresDelFormulario.posee_taller}
              label="¿Posee taller mecánico?"
              labelPlacement="start"
              control={(
                <Switch
                  checked={valoresDelFormulario.posee_taller}
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
                  disabled={bloquearDeshabilitacion}
                />
              )}
              sx={{
                marginTop: '2ch',
                justifyContent: 'space-between',
                marginLeft: '0ch',
              }}
            />
            {bloquearDeshabilitacion && (
              <Alert variant="outlined" severity="info">
                No se puede deshabilitar esta sucursal porque
                posee un taller activo asociado a ella.
              </Alert>
            )}

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
