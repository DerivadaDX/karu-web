import React from 'react';

import {
  Box,
  Grid,
  Paper,
} from '@mui/material';

import Encabezado from '../common/Encabezado';
import EstadoCuenta from './components/EstadoCuenta';
import ListadoMovimientos from './components/ListadoMovimientos';
import InformacionSucursal from './components/InformacionSucursal';

const styles = {
  paper: {
    padding: 2,
  },
};

styles.paperSuperior = {
  ...styles.paper,
  height: 200,
};

styles.paperInferior = {
  ...styles.paper,
  overflow: 'auto',
  maxHeight: '60vh',
};

const CuentaCorriente = () => (
  <Box>
    <Encabezado
      titulo="Cuenta corriente"
      subtitulo="Consultar saldo actual, datos de la sucursal y últimos movimientos"
    />
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={styles.paperSuperior}>
          <EstadoCuenta />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Paper sx={styles.paperSuperior}>
          <InformacionSucursal />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={styles.paperInferior}>
          <ListadoMovimientos />
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default CuentaCorriente;
