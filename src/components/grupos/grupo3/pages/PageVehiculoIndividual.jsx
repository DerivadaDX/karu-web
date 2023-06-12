import { Link } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import React from 'react';
import VehiculoIndividual from '../components/ventas/vehiculoIndividual/vehiculoIndividual';
import AcordeonObservaciones from '../components/common/acordeonObservaciones';
// import ConsultaDialog from '../components/common/consultaDialog';

const patente = sessionStorage.getItem('patente');

const PageVehiculoIndividual = () => (
  <Container>
    <VehiculoIndividual />
    <Box sx={{
      mt: 6,
      flexgrow: 1,
      display: 'grid',
      gap: 2,
    }}
    >
      <AcordeonObservaciones />
      <Link to={`/vehiculoIndividual/${patente}/reserva`}>
        <Button variant="contained">Reservar</Button>
      </Link>
    </Box>
  </Container>

);

export default PageVehiculoIndividual;
