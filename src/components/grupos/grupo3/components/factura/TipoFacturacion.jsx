import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TipoFacturacion = () => {
  const [open, setOpen] = useState(false);
  const [tipoFinanciacion, setTipoFinanciacion] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTipoFinanciacionChange = (event) => {
    setTipoFinanciacion(event.target.value);
  };

  const handleAceptarClick = () => {
    navigate(`/hacer-factura?tipoFinanciacion=${tipoFinanciacion}`);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Elegir tipo de financiación</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Financiación</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Tipo de financiación</InputLabel>
            <Select
              value={tipoFinanciacion}
              onChange={handleTipoFinanciacionChange}
            >
              <MenuItem value="tarjeta-credito">Tarjeta de crédito</MenuItem>
              <MenuItem value="credito-bancario">Crédito bancario</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAceptarClick} variant="contained" color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TipoFacturacion;
