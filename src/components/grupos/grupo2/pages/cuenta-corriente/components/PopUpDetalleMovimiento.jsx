import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

import DineroHelper from '../helpers/dinero-helper';
import FechaHelper from '../helpers/fecha-helper';

const PopUpDetalleMovimiento = ({ movimiento }) => {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);

  const cambiarVisibilidadPopUp = () => {
    setMostrarPopUp(!mostrarPopUp);
  };

  return (
    <Box>
      <Button variant="contained" onClick={cambiarVisibilidadPopUp}>
        Ver más
      </Button>
      <Dialog
        open={mostrarPopUp}
        onClose={cambiarVisibilidadPopUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Número de operación:
          {` ${movimiento.numero_operacion}`}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              disabled
              id="standard-disabled"
              label="Fecha en que se realizó"
              defaultValue={FechaHelper.formatearComoFechaHora(movimiento.fecha)}
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="Tipo de operación"
              defaultValue={movimiento.tipo === 'D' ? 'Débito' : 'Crédito'}
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label={movimiento.tipo === 'D' ? 'Se le envió a' : 'Envió'}
              defaultValue={movimiento.nombre_persona}
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="Monto"
              defaultValue={DineroHelper.formatearComoDinero(Math.abs(movimiento.monto))}
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="Concepto"
              defaultValue={movimiento.concepto}
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="DNI/CUIT"
              defaultValue={movimiento.documento_persona ?? '-'}
              variant="standard"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={cambiarVisibilidadPopUp}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

PopUpDetalleMovimiento.propTypes = {
  movimiento: PropTypes.shape({
    numero_operacion: PropTypes.string,
    fecha: PropTypes.string,
    tipo: PropTypes.string,
    nombre_persona: PropTypes.string,
    monto: PropTypes.number,
    concepto: PropTypes.string,
    documento_persona: PropTypes.string,
  }).isRequired,
};

export default PopUpDetalleMovimiento;
