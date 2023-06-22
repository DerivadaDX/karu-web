/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
} from '@mui/material';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PopUpTipoFacturacion from './PopUpTipoFacturacion';
import CotizacionService from '../../services/CotizacionService';

const PopUpFacturar = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [cotizacionDNI, setcotizacionDNI] = useState('');
  const [cotizacionTotal, setcotizacionTotal] = useState('');
  sessionStorage.idCotizacion = JSON.stringify(id);
  const navigate = useNavigate();

  PopUpFacturar.propTypes = {
    id: PropTypes.number.isRequired,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFactura = () => { // No
    setOpen(false);
    navigate('/facturar');
    sessionStorage.conFinanciacion = 'no';
    sessionStorage.factura = '';
  };

  const handleClose = () => { // Sí
    setOpen(false);
  };
  // paso datos
  const guardarDatos = async () => {
    try {
      const response = await CotizacionService.obtenerUnaCotizacion(id);
      if (response) {
        setcotizacionDNI(response.data.cliente.dni);
        setcotizacionTotal(response.data.total);
      } else {
        // Manejar el caso en que la respuesta no sea exitosa
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
  }, []);
  return (
    <div>
      <Tooltip title="Facturar" placement="top">
        <IconButton onClick={handleOpen}>
          <ReceiptOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Financiación
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            X
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p>¿Desea elegir un tipo de financiación?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFactura}>No</Button>
          {/* Me lleva a elegir el tipo de financiación */}
          <PopUpTipoFacturacion id={id} dni={cotizacionDNI} total={cotizacionTotal} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUpFacturar;
