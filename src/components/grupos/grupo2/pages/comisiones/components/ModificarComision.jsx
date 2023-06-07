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

import ComisionService from '../services/comision-service';

const ModificarComision = ({ comision, onEdit }) => {
  const [mostrarPopUpModificarComision, setMostrarPopUpModificarComision] = useState(false);
  const [mostrarPopUpModificacionExitosa, setMostrarPopUpModificacionExitosa] = useState(false);
  const [valoresDelFormulario, setValoresDelFormulario] = useState({
    nombre: '',
    valor: '',
    categoria_id: '',
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

    const cambioUnCampoNumerico = name === 'numero';
    if (cambioUnCampoNumerico) {
      valorNuevo = parseInt(value, 10);
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
          Modificar Comision
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
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              id="categoria_id"
              name="categoria_id"
              value={valoresDelFormulario.categoria_id}
              label="Categoria"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              required
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

ModificarComision.propTypes = {
  comision: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    valor: PropTypes.string,
    categoria_id: PropTypes.string,
    activa: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ModificarComision;
