/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
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

const PopUpTipoFacturacion = ({ id, dni, total }) => {
  const [open, setOpen] = useState(false);
  const [tipoFinanciacion, setTipoFinanciacion] = useState('');
  const [error, setError] = useState(false); // Estado para controlar el error
  const [planes, setPlanes] = useState([]);
  const [cotizacionDNI, setcotizacionDNI] = useState('');
  const [cotizacionTotal, setcotizacionTotal] = useState('');
  const [resultsFound, setResultsFound] = useState(true);
  // Guardo datos
  const [orden, setOrden] = useState('');
  const [scoring, setScoring] = useState('');
  const [tasa, setTasa] = useState('');
  const [monto, setMonto] = useState('');
  const [cuotas, setCuotas] = useState('');
  const [valor, setValor] = useState('');

  const navigate = useNavigate();

  /* const guardarDatos = () => {
    CotizacionService.obtenerUnaCotizacion(id)
      .then((response) => {
        if (response) {//se pasan los datos bien
          setcotizacionDNI(response.data.cliente.dni);
          setcotizacionTotal(response.data.total);
          console.log(cotizacionDNI, cotizacionTotal);
          setResultsFound(true);
        } else {
          // Manejar el caso en que la respuesta no sea exitosa
          // sale error
        }
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error(error);
      });
  }; */
  // datos que traemos
  const showDataTipo = () => {
    console.log('segunda', dni, total);
    FinanciacionService.obtenerPlanes(dni, total)
      .then((response) => {
        if (response) {// se pasan los datos bien
          setPlanes(response.data);
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

  useEffect(() => {
    // mostrar datos desde API
    // guardarDatos();
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
    const selectedPlanId = event.target.value;

    // Buscar el plan seleccionado en los recomendados
    const selectedPlanRecomendados = planes.recomendados.find((plan) => plan.id_plan === selectedPlanId);
    if (selectedPlanRecomendados) {
      const {
        id_plan, ordinal, scoring_asociado, tasa_interes, cant_cuotas, valor_cuota, monto_con_interes,
      } = selectedPlanRecomendados;
      setTipoFinanciacion(id_plan);
      setOrden(ordinal);
      setScoring(scoring_asociado);
      setTasa(tasa_interes);
      setMonto(monto_con_interes);
      setCuotas(cant_cuotas);
      setValor(valor_cuota);
      return;
    }

    // Buscar el plan seleccionado en los no recomendados
    const selectedPlanNoRecomendados = planes.no_recomendados.find((plan) => plan.id_plan === selectedPlanId);
    if (selectedPlanNoRecomendados) {
      const {
        id_plan, ordinal, scoring_asociado, tasa_interes, cant_cuotas, valor_cuota, monto_con_interes,
      } = selectedPlanNoRecomendados;
      setTipoFinanciacion(id_plan);
      setOrden(ordinal);
      setScoring(scoring_asociado);
      setTasa(tasa_interes);
      setMonto(monto_con_interes);
      setCuotas(cant_cuotas);
      setValor(valor_cuota);
    }
  };

  const handleAceptarClick = () => {
    if (tipoFinanciacion) {
      const facturaData = {
        idPlan: tipoFinanciacion,
        ordinal: orden,
        scoringAsociado: scoring,
        tasaInteres: tasa,
        montoConInteres: monto,
        cantCuotas: cuotas,
        valorCuota: valor,
      };
      const infoCotizacion = facturaData;
      sessionStorage.setItem('factura', JSON.stringify(infoCotizacion));
      navigate(`/facturar/${id}`);
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
          {planes.recomendados && (
            <FormControl fullWidth style={{ marginBottom: '10px' }}>
              <Typography variant="h6" gutterBottom>
                Tipo de financiación (Recomendado)
              </Typography>
              <Select
                value={tipoFinanciacion}
                onChange={handleTipoFinanciacionChange}
                error={error}
              >
                {planes.recomendados.map((plan) => (
                  <MenuItem key={plan.id_plan} value={plan.id_plan}>
                    {/* Opcion 1: id de plan, scoring, tasa de interes%, cant. cuotas, valor de cuotas */}
                    Opcion {plan.id_plan} - {plan.scoring_asociado}, {plan.tasa_interes}%, {plan.cant_cuotas}, {plan.valor_cuota}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

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
                  <MenuItem key={plan.id_plan} value={plan.id_plan}>
                    {/* Opcion 1: id de plan, scoring, tasa de interes%, cant. cuotas, valor de cuotas */}
                    Opcion {plan.id_plan} - {plan.scoring_asociado}, Tasa Interes:{plan.tasa_interes}%, Cant. Cuotas:{plan.cant_cuotas}, Valor:${plan.valor_cuota}
                  </MenuItem>
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
