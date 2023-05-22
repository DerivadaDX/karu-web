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
} from '@mui/material';
import PropTypes from 'prop-types';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SucursalService from '../services/sucursal-service';

const PopUpDeshabilitarSucursal = ({ id, onDelete }) => {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);

  const cambiarVisibilidadPopUp = () => {
    setMostrarPopUp(!mostrarPopUp);
  };

  const deshabilitarSucursal = () => {
    SucursalService.deshabilitarSucursal(id)
      .then((response) => {
        if (response.status === 204) {
          onDelete(id);
        }
      })
      .finally(cambiarVisibilidadPopUp);
  };

  return (
    <Box>
      <IconButton aria-label="delete" onClick={cambiarVisibilidadPopUp}>
        <Tooltip title="Deshabilitar" placement="right">
          <RemoveCircleIcon color="error" />
        </Tooltip>
      </IconButton>
      <Dialog
        open={mostrarPopUp}
        onClose={cambiarVisibilidadPopUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deshabilitar sucursal
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas deshabilitar esta sucursal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cambiarVisibilidadPopUp}>
            Cancelar
          </Button>
          <Button onClick={deshabilitarSucursal} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

PopUpDeshabilitarSucursal.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PopUpDeshabilitarSucursal;
