/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable object-curly-newline */
import { Box, Button, Paper, Typography } from '@mui/material';

import styled from '@emotion/styled';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    width: '600px',
    height: '350px',
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
        padding: '15px',
      }}
    >
      {/* <Img src={vehiculoData.picture1} alt="autousado" /> */}
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <Box sx={{ flexgrow: 1, display: 'grid', gap: 5, padding: '15px', marginRight: '20%' }}>
        <Typography sx={{ lineHeight: 1, fontWeight: 'bold', fontSize: 32 }} variant="h4">
          {vehiculoData.brand}
        </Typography>
        <Typography sx={{ lineHeight: 0 }} variant="h6">
          Modelo:
          {vehiculoData.model}
        </Typography>
        <Typography sx={{ lineHeight: 0, fontWeight: '200' }} variant="h6">
          {vehiculoData.year}
        </Typography>
        <Typography
          sx={{ lineHeight: 2,
            fontSize: 25,
            fontWeight: 'bold',
          }}
          variant="body1"
        >
          $
          {vehiculoData.sellPrice}
        </Typography>
        <Typography sx={{ lineHeight: 0 }} variant="subtitle1">
          Combustible:
          {vehiculoData.fuelType}
        </Typography>
        <Typography sx={{ lineHeight: 0 }} variant="body1">
          {vehiculoData.gnc ? 'Posee GNC' : 'No posee GNC'}
        </Typography>
        <Typography sx={{ lineHeight: 0 }} variant="body1">
          Origen:
          {vehiculoData.origin}
        </Typography>
        <Typography sx={{ lineHeight: 0 }} variant="body1">
          Kilometraje:
          {vehiculoData.kilometers}
        </Typography>
        <Typography sx={{ lineHeight: 0 }} variant="body1">
          Patente:
          {vehiculoData.plate}
        </Typography>
        <Typography sx={{ lineHeight: 0 }} variant="body1"> </Typography>
      </Box>
      <ConsultaDialog sx={{ lineHeight: 0 }} />
      <Link to={`/vehiculoIndividual/${vehiculoData.plate}/reserva`}>
        <Button variant="contained">Reservar</Button>
      </Link>
      <Link to="/vehiculoIndividual/FormularioCliente">
        <Button variant="contained">
          Canjear
          {vehiculoData.plate ? sessionStorage.setItem('patenteVenta', vehiculoData.plate) : ''}
        </Button>
      </Link>
    </Paper>
  );
};

export default VehiculoIndividual;
