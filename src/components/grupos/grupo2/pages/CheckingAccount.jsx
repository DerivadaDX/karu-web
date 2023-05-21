import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Balance from '../components/Balance';
import Orders from '../components/Orders';
import Subsidiary from '../components/Subsidiary';

const styles = {
  container: {
    mt: 4,
    mb: 4,
  },
  paper: {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
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

const CheckingAccount = () => (
  <Container maxWidth="lg" sx={styles.container}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={styles.paperSuperior}>
          <Balance />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Paper sx={styles.paperSuperior}>
          <Subsidiary />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={styles.paperInferior}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default CheckingAccount;
