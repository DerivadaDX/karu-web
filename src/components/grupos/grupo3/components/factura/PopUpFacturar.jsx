import React, { useState } from 'react';
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
// import CotizacionService from '../../services/CotizacionService';

const PopUpFacturar = ({ id }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  PopUpFacturar.propTypes = {
    id: PropTypes.number.isRequired,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFactura = () => { // No
    setOpen(false);
    navigate(`/facturar/${id}`);
  };

  const handleClose = () => { // Sí
    // CotizacionService.anularCotizacion(id);
    // .then((response) => {
    // setCotizaciones(response.data);
    //  setCargando(false);
    // });

    setOpen(false);
    // navigate(`/tipo-financiacion/${id}`);
  };

  return (
    <div>
      <Tooltip title="Anular" placement="top">
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
          <PopUpTipoFacturacion id={id} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUpFacturar;
