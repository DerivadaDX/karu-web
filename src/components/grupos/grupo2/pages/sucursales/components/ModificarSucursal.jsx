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
  const [valoresDelFormulario, setValoresDelFormulario] = useState({
    nombre: '',
    calle: '',
    numero: '',
    localidad: '',
    provincia: '',
    codigoPostal: '',
    poseeTaller: false,
    activa: false,
  });

  const actualizarValor = (event) => {
    const { name, value, checked } = event.target;

    const newValue = name === 'activa' || name === 'poseeTaller' ? checked : value;
    setValoresDelFormulario((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const modificarSucursal = (evento) => {
    evento.preventDefault();
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
      .then(() => setMostrarPopUpModificacionExitosa(true));
  };

  const recargarData = () => {
    setValoresDelFormulario({
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

  const cerrarComponente = () => {
    setMostrarPopUpModificacionExitosa(false);
    setMostrarPopUpModificarSucursal(false);
    onEdit();
  };

  return (
    <Box>
      <Tooltip title="Editar">
        <IconButton onClick={() => {
          setMostrarPopUpModificarSucursal(true);
          recargarData();
        }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={mostrarPopUpModificarSucursal}
        onClose={() => {
          setMostrarPopUpModificarSucursal(false);
        }}
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
              onChange={actualizarValor}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="calle"
              name="calle"
              value={valoresDelFormulario.calle}
              label="Calle"
              onChange={actualizarValor}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="numero"
              name="numero"
              value={valoresDelFormulario.numero}
              label="Altura"
              onChange={actualizarValor}
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
              onChange={actualizarValor}
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
              onChange={actualizarValor}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="provincia"
              name="provincia"
              value={valoresDelFormulario.provincia}
              label="Provincia"
              onChange={actualizarValor}
              variant="standard"
              margin="dense"
              required
            />
            <FormControlLabel
              id="poseeTaller"
              value={valoresDelFormulario.poseeTaller}
              label="Taller Mecánico"
              labelPlacement="start"
              control={(
                <Switch
                  checked={valoresDelFormulario.poseeTaller}
                  onChange={actualizarValor}
                  disabled={sucursal.posee_taller}
                  name="poseeTaller"
                />
              )}
              sx={{ marginTop: '2ch', justifyContent: 'space-between', marginLeft: '0ch' }}
            />
            <FormControlLabel
              id="activa"
              value={valoresDelFormulario.activa}
              label="Habilitada"
              labelPlacement="start"
              control={(
                <Switch
                  checked={valoresDelFormulario.activa}
                  onChange={actualizarValor}
                  name="activa"
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
