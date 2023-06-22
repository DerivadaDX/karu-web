import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Alert, AlertTitle } from '@mui/material';
import { Link } from 'react-router-dom';

const FacturaRealizada = () => (
  <Container style={{ paddingBottom: '80px', paddingTop: '80px', position: 'relative' }}>
    <div style={{ marginBottom: '20px' }}>
      <Alert sx={{ backgroundColor: '#9ad29c' }} severity="success">
        <AlertTitle>¡Realizado!</AlertTitle>
        Su Factura ha sido registrada con éxito.
      </Alert>
    </div>
    <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
      <Link to="/cotizaciones">
        <Button>Finalizar</Button>
      </Link>
    </div>
  </Container>
);

export default FacturaRealizada;
