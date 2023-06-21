/* eslint-disable max-len */
/* eslint-disable radix */
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
  Typography,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FinanciacionService from '../../services/FinanciacionService';
import CotizacionService from '../../services/CotizacionService';

const PopUpTipoFacturacion = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [tipoFinanciacion, setTipoFinanciacion] = useState('');
  const [error, setError] = useState(false); // Estado para controlar el error
  const [planes, setPlanes] = useState([]);
  const [cotizacionDNI, setcotizacionDNI] = useState('');
  const [cotizacionTotal, setcotizacionTotal] = useState('');
  console.log(id);
  const navigate = useNavigate();

  const guardarDatos = () => {
    CotizacionService.obtenerUnaCotizacion(id)
      .then((response) => {
        if (response) {
          setcotizacionDNI(response.data.cliente.dni);
          setcotizacionTotal(response.data.total);
        } else {
          // Manejar el caso en que la respuesta no sea exitosa
          // sale error
        }
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error(error);
      });
  };
  // datos que traemos
  const showDataTipo = async () => {
    try {
      // eslint-disable-next-line max-len
      // console.log(cotizacionDNI, cotizacionTotal);
      const response = await FinanciacionService.obtenerPlanes(12345678, 173151225.55519998);
      console.log('response', response.data);
      if (response) {
        // console.log(response.data);
        setPlanes(response.data);
      } else {
        // Manejar el error en caso de que la respuesta no sea exitosa
        // sale error
      }
    } catch (error) {
      // Manejar el error de la solicitud
      console.error(error);
    }
  };
  useEffect(() => {
    // mostrar datos desde API
    guardarDatos();
    showDataTipo();
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
          {planes.no_recomendados && (
            <FormControl fullWidth style={{ marginBottom: '10px' }}>
              <Typography variant="h6" gutterBottom>
                Tipo de financiación (No recomendado)
              </Typography>
              <Select
                value={tipoFinanciacion}
                onChange={handleTipoFinanciacionChange}
                error={error}
              >
                {planes.no_recomendados.map((plan) => (
                  <MenuItem key={plan.id_plan} value={plan.id_plan}>{plan.scoring_asociado}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {planes.recomendados && (
            <FormControl fullWidth style={{ marginBottom: '10px' }}>
              <Typography variant="h6" gutterBottom>
                Tipo de financiación (Recomendado)
              </Typography>
              <InputLabel style={{ maxWidth: '100%' }}>Tipo de financiación (Recomendado)</InputLabel>
              <Select
                value={tipoFinanciacion}
                onChange={handleTipoFinanciacionChange}
                error={error}
              >
                {planes.recomendados.map((plan) => (
                  <MenuItem key={plan.id_plan} value={plan.id_plan}>{plan.scoring_asociado}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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

PopUpTipoFacturacion.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PopUpTipoFacturacion;
