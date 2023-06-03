/* eslint-disable import/no-duplicates */
/* eslint-disable object-curly-newline */
import { Box, Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import imagenAuto from '../../../constants/autoUsado.jpg';

const VehiculoIndividual = () => {
  const Img = styled('img')({
    width: 600,
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  });

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        overflow: 'Hidden',
        mt: 5,
      }}
    >
      <Img
        src={imagenAuto}
        alt="autousado"
      />
      <Box sx={{ flexgrow: 1, display: 'grid', gap: 4 }}>
        <Typography variant="h4"> Toyota Corolla</Typography>
        <Typography variant="body1">    </Typography>
        <Typography variant="body1">    </Typography>
        <Typography variant="body1">    </Typography>
        <Button variant="outlined">Observaciones</Button>
        <Link to="/consulta">
          <Button variant="outlined">Consultar</Button>
        </Link>
      </Box>
      <Box
        sx={{ mr: 1, fontSize: 34, fontWeight: 'bold' }}
        component="p"
      >
        $8.000.000
      </Box>

    </Paper>
  );
};

export default VehiculoIndividual;
