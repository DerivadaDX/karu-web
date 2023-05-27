import React from 'react';

import {
  Box,
  Paper,
} from '@mui/material';

import Encabezado from '../common/Encabezado';
import ListadoSucursales from './components/ListadoSucursales';
import PopUpCrearVendedor from '../vendedores/components/PopUpCrearVendedor';

const styles = {
  paper: {
    padding: 2,
  },
};

const Sucursales = () => (
  <Box>
    <Encabezado titulo="Sucursales" subtitulo="Alta, baja y modificación de sucursales" />
    <Paper sx={styles.paper} elevation={5}>
      <ListadoSucursales />
    </Paper>
    <PopUpCrearVendedor />
  </Box>
);

export default Sucursales;
