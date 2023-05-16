import React from 'react';
import Grid from '@mui/material/Grid';
import HomeImage from '../../assets/pictures/home.jpg';

const Home = () => (
  <Grid container spacing={3} justifyContent="center" alignItems="center">
    <Grid item xs={12}>
      <img src={HomeImage} alt="example" />
    </Grid>
  </Grid>
);

export default Home;
