/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable object-curly-newline */
import { Box, Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import imagenAuto from '../../../constants/autoUsado.jpg';
import ConsultaDialog from '../../common/consultaDialog';
import autosEnVenta from '../../../constants/autosEnVenta';
import AcordeonObservaciones from '../../common/acordeonObservaciones';
import VehiculoService from '../../../services/VehiculoService';
import ImageSlider from '../../common/carrusel';

const VehiculoIndividual = () => {
  const Img = styled('img')({
    width: 600,
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  });

  const [vehiculoData, setVehiculo] = useState([]);
  const { productId } = useParams();
  const obtenerVehiculo = () => {
    VehiculoService.obtenerVehiculo(productId)
      .then((response) => {
        setVehiculo(response.data.result);
      });
  };
  sessionStorage.setItem('patente', productId);
  useEffect(obtenerVehiculo, []);
  // const vehicleSelected = vehiculoData.find((product) => vehiculoData.plate === productId);
  const espacio = '  ';
  const slides = [
    { url: vehiculoData.picture1, title: 'Imagen 1' },
    { url: vehiculoData.picture2, title: 'Imagen 2' },
    { url: vehiculoData.picture3, title: 'Imagen 3' },
  ];

  const containerStyles = {
    width: '1000px',
    height: '450px',
    margin: '0 auto',
    backgroundSize: 'contain',
  };

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
      {/* <Img src={vehiculoData.picture1} alt="autousado" /> */}
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <Box sx={{ flexgrow: 1, display: 'grid', gap: 4 }}>
        <Typography variant="h4">
          {vehiculoData.brand}
          {espacio}
          {vehiculoData.model}
        </Typography>
        <Typography variant="body1">
          Combustible:
          {vehiculoData.fuelType}
        </Typography>
        <Typography variant="body1">
          Origen:
          {vehiculoData.origin}
        </Typography>
        <Typography variant="body1">
          Año:
          {vehiculoData.year}
        </Typography>
        <Typography variant="body1">
          Kilometraje:
          {vehiculoData.kilometers}
        </Typography>
        <Typography variant="body1">
          Patente:
          {vehiculoData.plate}
        </Typography>
        <Typography variant="body1"> </Typography>
      </Box>
      <Box sx={{ mr: 1, fontSize: 34, fontWeight: 'bold' }} component="p">
        $
        {vehiculoData.sellPrice}
      </Box>
      <ConsultaDialog />
    </Paper>
  );
};

export default VehiculoIndividual;
