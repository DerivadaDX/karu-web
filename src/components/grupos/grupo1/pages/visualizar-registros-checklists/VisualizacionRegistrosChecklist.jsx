/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';
import LittleHeader from '../../components/common/LittleHeader';

const PopupChecklist = (props) => {
  const {
    children, value, tipo, title, openPopup, setOpenPopup, disableBackdropClick, ...other
  } = props;

  const handleClose = () => {
    if (!disableBackdropClick) {
      setOpenPopup(false);
    }
  };

  return (
    <div
      hidden={value !== tipo}
      id={`simple-tabpanel-${tipo}`}
      {...other}
    >
      {value === tipo && (
        <Dialog
          open={openPopup}
          maxWidth="lg"
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent dividers>
            {children}
          </DialogContent>
          <DialogActions sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Button
              color="primary"
              variant="outlined"
              sx={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={() => setOpenPopup(false)}
            >
              Atrás
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

PopupChecklist.propsTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  openPopup: PropTypes.bool.isRequired,
  setOpenPopup: PropTypes.func.isRequired,
  disableBackdropClick: PropTypes.bool.isRequired,
};

export const VisualizacionRegistroChecklist = (props) => {
  const {
    value, openPopup, setOpenPopup, disableBackdropClick,
  } = props;

  return (
    <>
      <PopupChecklist
        openPopup={openPopup}
        value={value}
        tipo="service"
        setOpenPopup={setOpenPopup}
        title={<LittleHeader titulo="Registro de service" subtitulo="Información" />}
        disableBackdropClick={disableBackdropClick}
      >
        Checklist de service
      </PopupChecklist>
      <PopupChecklist
        openPopup={openPopup}
        value={value}
        setOpenPopup={setOpenPopup}
        tipo="evaluacion"
        title={<LittleHeader titulo="Registro de evaluación" subtitulo="Información" />}
        disableBackdropClick={disableBackdropClick}
      >
        Checklist de evaluacion
      </PopupChecklist>
      <PopupChecklist
        openPopup={openPopup}
        value={value}
        setOpenPopup={setOpenPopup}
        tipo="reparacion"
        title={<LittleHeader titulo="Registro de reparación" subtitulo="Información" />}
        disableBackdropClick={disableBackdropClick}
      >
        Checklist de Reparacion
      </PopupChecklist>
      <PopupChecklist
        openPopup={openPopup}
        value={value}
        setOpenPopup={setOpenPopup}
        tipo="extraordinario"
        title={<LittleHeader titulo="Registro extraordinario" subtitulo="Información" />}
        disableBackdropClick={disableBackdropClick}
      >
        Checklist de extraoridinario
      </PopupChecklist>
    </>

  );
};
