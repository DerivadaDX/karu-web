import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PropTypes from 'prop-types';
import {
  DialogTitle,
} from '@mui/material';

const PopUpConfirmDisable = ({ id, onDisableSubsidiary }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    fetch(`http://localhost:8000/v1/sucursal/${id}/`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activa: false }),
    })
      .then((response) => {
        if (response.ok) {
          // La solicitud se realizó correctamente, puedes mostrar un mensaje de éxito
          onDisableSubsidiary(id);
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
  onDisableSubsidiary: PropTypes.func.isRequired,
};

export default PopUpConfirmDisable;
