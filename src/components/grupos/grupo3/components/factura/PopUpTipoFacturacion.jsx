/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
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
import FinanciacionService from '../../services/FinanciacionService';

const PopUpTipoFacturacion = () => {
  const [open, setOpen] = useState(false);
  const [tipoFinanciacion, setTipoFinanciacion] = useState('');
  const [error, setError] = useState(false); // Estado para controlar el error
  const [planes, setPlanes] = useState([]);

  const navigate = useNavigate();

  // datos que traemos
  const showData = async () => {
    const response = await FinanciacionService.obtenerPlanes();
    console.log(response.data.result);
    setPlanes(response.data.result);
  };
  useEffect(() => {
    // mostrar datos desde API
    showData();
  }, []);

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
          {/* Eligo planes de Pago */}
          {planes.map((plan) => (
            <FormControl fullWidth>
              <InputLabel>Tipo de financiación</InputLabel>
              <Select
                value={plan}
                onChange={handleTipoFinanciacionChange}
                error={error} // Establecer el estado de error en el componente Select
              >
                <MenuItem>{plan}</MenuItem>
              </Select>
            </FormControl>
          ))}

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
