import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

import ComisionService from '../services/comision-service';

const PopUpModificarComision = ({ comision, onEdit }) => {
  const [mostrarPopUpModificarComision, setMostrarPopUpModificarComision] = useState(false);
  const [mostrarPopUpModificacionExitosa, setMostrarPopUpModificacionExitosa] = useState(false);
  const [valoresDelFormulario, setValoresDelFormulario] = useState({
    nombre: '',
    valor: '',
    categoria_id: 0,
    activa: false,
  });

  const mostrarYCargarFormulario = () => {
    setMostrarPopUpModificarComision(true);
    setValoresDelFormulario({
      id: comision.id,
      nombre: comision.nombre,
      valor: comision.valor,
      categoria_id: comision.categoria_id,
      activa: comision.activa,
    });
  };

  const cambiarVisibilidadDePopUpModificarComision = () => {
    setMostrarPopUpModificarComision(!mostrarPopUpModificarComision);
  };

  const cambiarVisibilidadDePopUpModificacionExitosa = () => {
    setMostrarPopUpModificacionExitosa(!mostrarPopUpModificacionExitosa);
  };

  const actualizarValorDeFormulario = (event) => {
    const { name, value, checked } = event.target;

    let valorNuevo = value;

    const cambioUnCheckbox = name === 'activa';
    if (cambioUnCheckbox) {
      valorNuevo = checked;
    }

    if (name === 'valor') {
      const regex = /^\d*?(.\d{0,2})?$/;
      if (!regex.test(value)) {
        return;
      }
      if (parseFloat(value) > 100) {
        valorNuevo = '100';
      }
    }

    setValoresDelFormulario((valoresActuales) => ({
      ...valoresActuales,
      [name]: valorNuevo,
    }));
  };

  const modificarComision = (event) => {
    event.preventDefault();

    ComisionService.modificarComision(comision.id, valoresDelFormulario)
      .then(cambiarVisibilidadDePopUpModificacionExitosa);
  };

  const finalizarModificacion = () => {
    const comisionModificada = {
      id: comision.id,
      ...valoresDelFormulario,
    };

    cambiarVisibilidadDePopUpModificacionExitosa();
    cambiarVisibilidadDePopUpModificarComision();
    onEdit(comisionModificada);
  };

  return (
    <Box>
      <Tooltip title="Editar">
        <IconButton onClick={mostrarYCargarFormulario}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={mostrarPopUpModificarComision}
        onClose={cambiarVisibilidadDePopUpModificarComision}
      >
        <DialogTitle sx={{ textAlign: 'center', fontSize: '2rem' }}>
          Modificar comisión
        </DialogTitle>

        <Paper>
          <Stack
            component="form"
            onSubmit={modificarComision}
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
              id="valor"
              name="valor"
              value={valoresDelFormulario.valor}
              label="Valor"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              required
              type="number"
              inputProps={{
                inputMode: 'decimal',
                step: '0.01',
              }}
            />
            <Select
              id="categoria_id"
              name="categoria_id"
              value={valoresDelFormulario.categoria_id}
              label="Categoria"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              style={{ marginTop: '24px' }}
            >
              <MenuItem value={1}>Gama baja</MenuItem>
              <MenuItem value={2}>Gama media</MenuItem>
              <MenuItem value={3}>Gama alta</MenuItem>
            </Select>
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

PopUpModificarComision.propTypes = {
  comision: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    valor: PropTypes.string,
    categoria_id: PropTypes.number,
    activa: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default PopUpModificarComision;
