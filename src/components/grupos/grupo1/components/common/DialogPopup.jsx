import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Popup(props) {
  const { title, description, children, openDialog, setOpenDialog} = props;

  return (
    <Dialog
      open={openDialog}
      maxWidth="md"
      onClose={() => setOpenDialog(false)}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent dividers >
        {description}
        {children}
      </DialogContent>
    </Dialog>
  );
}
