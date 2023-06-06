import React from 'react';

import {
  Box,
  Paper,
} from '@mui/material';

import Encabezado from '../common/Encabezado';
import ListadoComisiones from './components/ListadoComisiones';

const styles = {
  paper: {
    padding: 2,
  },
};

const Comisiones = () => (
  <Box>
    <Encabezado
      titulo="Comisiones"
      subtitulo="Alta, baja y modificación de comisiones por categoría de vehículo"
    />
    <Paper sx={styles.paper} elevation={5}>
      <ListadoComisiones />
    </Paper>
  </Box>
);

export default Comisiones;
