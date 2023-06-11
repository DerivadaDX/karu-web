/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import * as React from 'react';
import {
  Box, Divider, Paper, Grid,
} from '@mui/material';
import Header from '../../components/common/Header';

const idTecnico = '46';
const fecha = new Date();

const anio = fecha.getFullYear();
let mes = fecha.getMonth() + 1;
let dia = fecha.getDate() + 1;

if (mes < 10) {
  mes = `0${mes}`;
}

if (dia < 10) {
  dia = `0${dia}`;
}

const fechaHasta = `${anio}-${mes}-${dia}`;
const fechaDesde = `${anio}-01-01`;

const Home = () => {
  const url = `http://metabase-insomnia.sytes.net:8080/public/dashboard/20101951-c26b-4a67-b631-d7e21154bad0?id_tecnico=${idTecnico}#hide_parameters=id_tecnico`;

  const turnosAsignados = `http://metabase-insomnia.sytes.net:8080/public/question/ac4bdbd5-bad0-4f58-ba52-b81df3ce14e5?filtro_tecnico=${idTecnico}#hide_parameters=filtro_tecnico`;

  const turnosTrabajadosPorTipo = `http://metabase-insomnia.sytes.net:8080/public/question/7d09dcde-6963-43be-b4c9-11764c4190d1?filtro_tecnico=${idTecnico}#hide_parameters=filtro_tecnico`;

  const turnosParaHoy = `http://metabase-insomnia.sytes.net:8080/public/question/d893955e-933c-42a4-a36e-d5255aae8451?filtro_tecnico=${idTecnico}#hide_parameters=filtro_tecnico`;

  const urlTurnosPorFecha = `http://metabase-insomnia.sytes.net:8080/public/question/30d81a07-05d5-40c0-a48f-cda00779a4b1?Desde=${fechaDesde}&Hasta=${fechaHasta}&id_tecnico=${idTecnico}#hide_parameters=id_tecnico`;

  const iframeStyles = {
    border: '1px solid #acacac',
    borderRadius: '10px',
    boxShadow: '0 5px 10px rgba(51, 51, 51, 0.6)',
  };

  return (
    <>
      <Box m="2px">
        <Box display="flex">
          <Header titulo="Dashboard" subtitulo="Inicio" />
        </Box>
        <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)' }} />
      </Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <iframe
            src={turnosParaHoy}
            width="100%"
            height="450rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <iframe
            src={turnosTrabajadosPorTipo}
            width="100%"
            height="450rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <iframe
            src={turnosAsignados}
            width="100%"
            height="400rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <iframe
            src={urlTurnosPorFecha}
            width="100%"
            height="400rem"
            style={iframeStyles}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
