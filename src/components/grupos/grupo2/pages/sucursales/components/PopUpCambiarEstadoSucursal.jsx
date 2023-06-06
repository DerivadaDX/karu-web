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
        if (response.status === 200 && !response.data.activa) {
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
  onSuccess: PropTypes.func.isRequired,
};

export default PopUpCambiarEstadoSucursal;
