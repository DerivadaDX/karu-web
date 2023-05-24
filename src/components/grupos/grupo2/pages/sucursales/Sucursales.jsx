import * as React from 'react';

import {
  Box,
  Paper,
} from '@mui/material';
import ListadoSucursales from './components/ListadoSucursales';
import Encabezado from '../common/Encabezado';

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
  </Box>
);

export default Sucursales;
