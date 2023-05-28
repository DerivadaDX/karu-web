import React from 'react';

import {
  Box,
  Paper,
} from '@mui/material';

import Encabezado from '../common/Encabezado';
import ListadoVendedores from './componentes/ListadoVendedores';

const styles = {
  paper: {
    padding: 2,
  },
};

const Vendedores = () => (
  <Box>
    <Encabezado titulo="Vendedores" subtitulo="Alta, baja y modificación de Vendedores" />
    <Paper sx={styles.paper} elevation={5}>
      <ListadoVendedores />
    </Paper>
  </Box>
);

export default Vendedores;
