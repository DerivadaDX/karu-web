import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import MovimientoService from '../services/movimiento-service';
import DineroHelper from '../helpers/dinero-helper';
import FechaHelper from '../helpers/fecha-helper';

const PopUpDetalleMovimiento = ({ movimientoId }) => {
  const [mostrarPopUp, setMostrarPopUp] = React.useState(false);
  const [movimiento, setMovimiento] = React.useState({});

  const cambiarVisibilidadPopUp = () => {
    setMostrarPopUp(!mostrarPopUp);
  };

  React.useEffect(() => {
    MovimientoService.obtenerMovimientoPorId(movimientoId)
      .then((response) => setMovimiento(response.data));
  }, []);

  return (
    <>
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
              defaultValue={DineroHelper.formatearComoDinero(movimiento.monto)}
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
          <Button onClick={cambiarVisibilidadPopUp}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PopUpDetalleMovimiento.propTypes = {
  movimientoId: PropTypes.node.isRequired,
};

export default PopUpDetalleMovimiento;
