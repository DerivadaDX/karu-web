/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable object-curly-newline */
import { Box, Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import imagenAuto from '../../../constants/autoUsado.jpg';
import ConsultaDialog from '../../common/consultaDialog';
import autosEnVenta from '../../../constants/autosEnVenta';

const VehiculoIndividual = () => {
  const Img = styled('img')({
    width: 600,
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  });

  const { productId } = useParams();
  const productSelected = autosEnVenta.find((product) => product.id === productId);
  const espacio = '  ';

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
      <Img src={imagenAuto} alt="autousado" />
      <Box sx={{ flexgrow: 1, display: 'grid', gap: 4 }}>
        <Typography variant="h4">
          {productSelected.marca}
          {espacio}
          {productSelected.modelo}
        </Typography>
        <Typography variant="body1">
          Combustible:
          {productSelected.combustible}
        </Typography>
        <Typography variant="body1">
          Kilometraje:
          {productSelected.kilometraje}
        </Typography>
        <Typography variant="body1">
          Año:
          {productSelected.anio}
        </Typography>
        <Typography variant="body1"> </Typography>
      </Box>
      <Box sx={{ mr: 1, fontSize: 34, fontWeight: 'bold' }} component="p">
        $
        {productSelected.precio}
      </Box>
      <ConsultaDialog />
    </Paper>
  );
};

export default VehiculoIndividual;
