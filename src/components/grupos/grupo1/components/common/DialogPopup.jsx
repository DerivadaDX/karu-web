/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup(props) {
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
      maxWidth="lg"
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent dividers>
        {description}
        {children}
      </DialogContent>
    </Dialog>
  );
}
