import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SucursalService from '../services/sucursal-service';

const PopUpCambiarEstadoSucursal = ({ sucursal, onSuccess }) => {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);

  const cambiarVisibilidadPopUp = () => {
    setMostrarPopUp(!mostrarPopUp);
  };

  const deshabilitarSucursal = () => {
    SucursalService.deshabilitarSucursal(sucursal.id)
      .then((response) => {
        if (response.status === 204) {
          onSuccess(sucursal.id);
        }
      })
      .finally(cambiarVisibilidadPopUp);
  };

  const habilitarSucursal = () => {
    SucursalService.habilitarSucursal(sucursal.id)
      .then((response) => {
        if (response.status === 200 && response.data.activa === true) {
          onSuccess(sucursal.id);
        }
      })
      .finally(cambiarVisibilidadPopUp);
  };

  const nombreOperacion = sucursal.activa ? 'Deshabilitar' : 'Habilitar';

  return (
    <Box>
      <IconButton onClick={cambiarVisibilidadPopUp}>
        <Tooltip title={nombreOperacion} placement="right">
          {
            sucursal.activa
              ? <RemoveCircleIcon color="error" />
              : <AddCircleIcon color="success" />
          }
        </Tooltip>
      </IconButton>
      <Dialog
        open={mostrarPopUp}
        onClose={cambiarVisibilidadPopUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${nombreOperacion} sucursal`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Se va a ${nombreOperacion.toLowerCase()} la sucursal:`}
            <Typography variant="body1" fontWeight="bold" component="span">
              {` ${sucursal.nombre}`}
            </Typography>
            . ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cambiarVisibilidadPopUp}>
            Cancelar
          </Button>
          <Button onClick={sucursal.activa ? deshabilitarSucursal : habilitarSucursal} variant="contained" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

PopUpCambiarEstadoSucursal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sucursal: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PopUpCambiarEstadoSucursal;
