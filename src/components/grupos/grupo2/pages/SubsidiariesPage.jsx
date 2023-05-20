import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SubsidiaryList from '../components/SubsidiaryList';

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

const SubsidiariesPage = () => (
  <Container maxWidth="lg" sx={styles.container}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={styles.paper}>
          <SubsidiaryList />
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default SubsidiariesPage;
