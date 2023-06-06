/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function PopupAgregarTurno(props) {
  const {
    title, description, children, openDialog, setOpenDialog, disableBackdropClick,
  } = props;

  const handleClose = () => {
    if (!disableBackdropClick) {
      setOpenDialog(false);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 'auto', height: 'auto',
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent dividers style={{ width: '100%' }}>
        {description}
        {children}
      </DialogContent>
    </Dialog>
  );
}
