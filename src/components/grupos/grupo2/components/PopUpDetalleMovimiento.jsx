import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  DialogTitle, Stack, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getMovimiento } from '../services/services';

const formatStringDate = (stringDate) => {
  const date = new Date(Date.parse(stringDate));
  const day = (date.getDay() + 1).toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

const PopUpDetalleMovimiento = ({ movimientoId }) => {
  const [open, setOpen] = React.useState(false);
  const [movimiento, setMovimiento] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMovimiento(movimientoId).then((response) => setMovimiento(response.data));
  }, []);

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Ver mas
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Número de operación:
          {' '}
          {movimiento.numero_operacion}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              disabled
              id="standard-disabled"
              label="Fecha en que se realizo"
              defaultValue={formatStringDate(movimiento.fecha)}
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="Tipo de operación"
              defaultValue={movimiento.tipo === 'D' ? 'Egreso' : 'Ingreso'}
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label={movimiento.tipo === 'D' ? 'Se le envió a ' : 'Envió'}
              defaultValue={movimiento.nombre_persona}
              variant="standard"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="Monto"
              defaultValue={movimiento.monto}
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
              label="Datos de la persona"
              defaultValue={movimiento.documento_persona}
              variant="standard"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PopUpDetalleMovimiento.propTypes = {
  movimientoId: PropTypes.node.isRequired,
};

export default PopUpDetalleMovimiento;
