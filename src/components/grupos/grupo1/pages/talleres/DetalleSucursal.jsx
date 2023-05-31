/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Box, Button, Stack, TextField, Typography,
} from '@mui/material';
import Alerts from '../../components/common/Alerts';
import { getDetalleSucursal } from '../../services/services-talleres';

const DetalleSucursal = (props) => {
  const { sucursalId, open, setOpen } = props;

  const [detalles, setDetalles] = useState({
    id: '',
    nombre: '',
    calle: '',
    numero: '',
    localidad: '',
    provincia: '',
    codigo_postal: '',
  });

  // alertas api
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState([]);
  const [alertTitle, setAlertTitle] = useState('');

  const traerDetalle = () => {
    getDetalleSucursal(sucursalId)
      .then((response) => {
        setDetalles(response.data);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage(
          <>
            Ha ocurrido un error, disculpe las molestias.Intente nuevamente más tarde.
            <br />
            Si el error persiste comunicarse con soporte: soporte-tecnico@KarU.com
          </>,
        );
        setAlertType('error');
        setAlertTitle('Error de servidor');
      });
  };

  useEffect(() => {
    traerDetalle();
  }, [sucursalId]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ overflow: 'auto' }}>
          <Alerts
            alertType={alertType}
            description={alertMessage}
            title={alertTitle}
          />
        </Box>
      </Box>
      <Stack spacing={2}>
        <TextField
          disabled
          id="standard-disabled"
          label="ID de sucursal"
          value={detalles.id}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Nombre"
          value={detalles.nombre}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Calle"
          value={detalles.calle}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Altura"
          value={detalles.numero}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Localidad"
          value={detalles.localidad}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Provincia"
          value={detalles.provincia}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="C.P."
          value={detalles.codigo_postal}
          variant="standard"
        />
      </Stack>
      {/* Botones que están en la base del popup */}
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Button
          variant="outlined"
          sx={{ mt: 3, ml: 1 }}
          color="primary"
          onClick={() => {
            setOpen(false);
          }}
        >
          Atrás
        </Button>
      </Box>
    </>
  );
};

export default DetalleSucursal;
