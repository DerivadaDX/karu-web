import { Container, Box, Button } from '@mui/material';
import React from 'react';
import VehiculoIndividual from '../components/ventas/vehiculoIndividual/vehiculoIndividual';

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
      <Button variant="contained">Reservar</Button>
    </Box>
  </Container>

);

export default PageVehiculoIndividual;
