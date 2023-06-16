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

  const handleClose = () => { // No
    setOpen(false);
    navigate(`/facturar/${id}`);
  };

  const handleConfirm = () => { // Sí
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
      <Dialog open={open}>
        <DialogTitle>Financiación</DialogTitle>
        <DialogContent>
          <p>¿Desea elegir un tipo de financiación?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          {/* Me lleva a elegir el tipo de financiación */}
          <PopUpTipoFacturacion id={id} onClick={handleConfirm} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUpFacturar;
