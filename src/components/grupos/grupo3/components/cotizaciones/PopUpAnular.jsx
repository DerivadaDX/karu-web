import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import CotizacionService from '../../services/CotizacionService';

const PopUpAnular = ({ id }) => {
  const [open, setOpen] = useState(false);

  PopUpAnular.propTypes = {
    id: PropTypes.number.isRequired,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    CotizacionService.anularCotizacion(id);
    // .then((response) => {
    // setCotizaciones(response.data);
    //  setCargando(false);
    // });
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Anular" placement="top">
        <IconButton onClick={handleOpen}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que deseas realizar esta acción?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUpAnular;
