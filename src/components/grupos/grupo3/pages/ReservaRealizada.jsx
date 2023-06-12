import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Alert, AlertTitle } from '@mui/material';
import { Link } from 'react-router-dom';

const ReservaRealizada = () => (
  <Container style={{ paddingBottom: '80px', paddingTop: '80px', position: 'relative' }}>
    <div style={{ marginBottom: '20px' }}>
      <Alert sx={{ backgroundColor: '#9ad29c' }} severity="success">
        <AlertTitle>¡Realizado!</AlertTitle>
        Su reserva se ha realizado con exito, puede volver a la pagina de inicio cuando lo desee.
      </Alert>
    </div>
    <div style={{ marginBottom: '20px' }}>
      <Alert sx={{ backgroundColor: '#9adcfb' }} severity="info">
        <AlertTitle>IMPORTANTE</AlertTitle>
        Tendra
        <strong> 24 hs </strong>
        para pagar la reserva. Una vez pasadas las 24 hs y no habiendose efectuado el pago,
        la reserva sera
        <strong> ¡anulada! </strong>
        <br />
        Se le habra enviado un email con los detalles de
        <strong> la factura y el CBU </strong>
        de donde deberá ingresar el dinero.
        <br />
        Luego, de haber efectuado el pago y dentro de un lapso de 48hs,
        un vendedor se contactara con usted para concretar un turno.
      </Alert>
    </div>
    <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
      <Link to="/">
        <Button>Finalizar</Button>
      </Link>
    </div>
  </Container>
);

export default ReservaRealizada;
