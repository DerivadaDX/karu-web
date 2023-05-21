import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PropTypes from 'prop-types';
import { DialogTitle } from '@mui/material';
import SucursalService from '../../../services/sucursal-service';

const PopUpConfirmDisable = ({ id, onDelete }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    SucursalService.deshabilitarSucursal(id)
      .then((response) => {
        if (response.status === 204) {
          // La solicitud se realizó correctamente, puedes mostrar un mensaje de éxito
          onDelete(id);
        }
      });

    // Cierra el diálogo después de confirmar la deshabilitación
    handleClose();
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <RemoveCircleIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PopUpConfirmDisable.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PopUpConfirmDisable;
