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

const PopUpTipoFacturacion = () => {
  const [open, setOpen] = useState(false);
  const [tipoFinanciacion, setTipoFinanciacion] = useState('');
  const [error, setError] = useState(false); // Estado para controlar el error
  const navigate = useNavigate();

  const handleOpenTipo = () => {
    setOpen(false);
    setOpen(true);
  };

  const handleCloseTipo = () => {
    setOpen(false);
  };

  const handleTipoFinanciacionChange = (event) => {
    setTipoFinanciacion(event.target.value);
  };

  const handleAceptarClick = () => {
    if (tipoFinanciacion) {
      navigate(`/hacer-factura?tipoFinanciacion=${tipoFinanciacion}`);
      setOpen(true);
      setError(false);
    } else {
      setError(true); // Establecer el estado de error si no se seleccionó ninguna opción
    }
  };

  return (
    <div>
      <Button onClick={handleOpenTipo}>Sí</Button>
      <Dialog open={open} onClose={handleCloseTipo}>
        <DialogTitle>Financiación</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Tipo de financiación</InputLabel>
            <Select
              value={tipoFinanciacion}
              onChange={handleTipoFinanciacionChange}
              error={error} // Establecer el estado de error en el componente Select
            >
              <MenuItem value="tarjeta-credito">Tarjeta de crédito</MenuItem>
              <MenuItem value="credito-bancario">Crédito bancario</MenuItem>
            </Select>
          </FormControl>
          {/* Mostrar mensaje de error si no se seleccionó ninguna opción */}
          {error && <p style={{ color: 'red' }}>Por favor, seleccione un tipo de financiación.</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTipo}>Cancelar</Button>
          <Button onClick={handleAceptarClick} variant="contained" color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUpTipoFacturacion;
