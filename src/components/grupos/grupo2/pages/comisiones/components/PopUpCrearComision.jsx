import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import ComisionService from '../services/comision-service';

const PopUpCrearComision = ({ onCreate }) => {
  const [mostrarPopUpCrearComision, setMostrarPopUpCrearComision] = useState(false);
  const [mostrarPopUpCreacionExitosa, setMostrarPopUpCreacionExitosa] = useState(false);
  const [valoresDelFormulario, setValoresDelFormulario] = useState({
    nombre: '',
    valor: '',
    categoria_id: '',
    activa: false,
  });

  const mostrarYCargarFormulario = () => {
    setMostrarPopUpCrearComision(true);
    setValoresDelFormulario({
      id: '',
      nombre: '',
      valor: '',
      categoria_id: '',
      activa: false,
    });
  };

  const cambiarVisibilidadDePopUpCrearComision = () => {
    setMostrarPopUpCrearComision(!mostrarPopUpCrearComision);
  };

  const cambiarVisibilidadDePopUpCreacionExitosa = () => {
    setMostrarPopUpCreacionExitosa(!mostrarPopUpCreacionExitosa);
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

  const crearComision = (event) => {
    event.preventDefault();

    ComisionService.crearComision(valoresDelFormulario)
      .then(cambiarVisibilidadDePopUpCreacionExitosa);
  };

  const finalizarCreacion = () => {
    cambiarVisibilidadDePopUpCreacionExitosa();
    cambiarVisibilidadDePopUpCrearComision();
    onCreate();
  };

  return (
    <Box>
      <Button variant="contained" onClick={mostrarYCargarFormulario}>
        <AddIcon />
        Crear sucursal
      </Button>

      <Dialog
        open={mostrarPopUpCrearComision}
        onClose={cambiarVisibilidadDePopUpCrearComision}
      >
        <DialogTitle sx={{ textAlign: 'center', fontSize: '2rem' }}>
          Modificar Comision
        </DialogTitle>

        <Paper>
          <Stack
            component="form"
            onSubmit={crearComision}
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
              inputProps={{ maxLength: 5 }}
            />
            <Select
              id="categoria_id"
              name="categoria_id"
              value={valoresDelFormulario.categoria_id}
              label="Categoria"
              onChange={actualizarValorDeFormulario}
              variant="standard"
              margin="dense"
              required
              style={{ marginTop: '24px' }}
            >
              <MenuItem disabled value="">Seleccionar categoría</MenuItem>
              <MenuItem value={1}>Categoria 1</MenuItem>
              <MenuItem value={2}>Categoria 2</MenuItem>
              <MenuItem value={3}>Categoria 3</MenuItem>
              <MenuItem value={4}>Categoria 4</MenuItem>
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
        open={mostrarPopUpCreacionExitosa}
        onClose={finalizarCreacion}
      >
        <DialogTitle id="alert-dialog-title">
          ¡Modificación exitosa!
        </DialogTitle>
        <DialogActions>
          <Button onClick={finalizarCreacion}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

PopUpCrearComision.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default PopUpCrearComision;
