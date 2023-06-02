import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import HomeImage from '../../assets/pictures/home.jpg';

const styles = {
  image: {
    marginTop: '1em',
    border: '1px solid #aaa',
  },
};

const Home = () => (
  <Box>
    <Box component="section">
      <Typography variant="h3" component="h3">
        Bienvenid@ a nuestro sitio web
      </Typography>
      <Typography>
        Seleccione una opción del menú lateral para comenzar
      </Typography>
    </Box>
    <Box component="section">
      <Grid container justifyContent="center">
        <Grid item>
          <img src={HomeImage} alt="example" style={styles.image} />
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default Home;
