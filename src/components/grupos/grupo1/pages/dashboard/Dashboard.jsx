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

const Dashboard = () => {
  const turnosAsignados = `http://metabase-insomnia.sytes.net/public/question/1ff3d9f0-afd0-409e-9981-05326b48edd9?id_tecnico=${idTecnico}#hide_parameters=id_tecnico`;

  const turnosTrabajadosPorTipo = `http://metabase-insomnia.sytes.net/public/question/a0000903-ba2d-43ee-b6a6-6c1bb5b5391d?filtro_tecnico=${idTecnico}#hide_parameters=filtro_tecnico`;

  const turnosParaHoy = `http://metabase-insomnia.sytes.net/public/question/72a191aa-958e-487c-85b4-8be38506917a?filtro_tecnico=${idTecnico}#hide_parameters=filtro_tecnico`;

  const urlTurnosPorFecha = `http://metabase-insomnia.sytes.net/public/question/4d6304f7-c642-4e83-8afc-54fe0f51d079?Desde=${fechaDesde}&Hasta=${fechaHasta}&id_tecnico=${idTecnico}#hide_parameters=id_tecnico`;

  const iframeStyles = {
    border: '1px solid #acacac',
    borderRadius: '10px',
    boxShadow: '0 5px 10px rgba(51, 51, 51, 0.6)',
  };

  return (
    <>
      <Box m="2px">
        <Box display="flex">
          <Header titulo="Dashboard" subtitulo="Visualización de la cantidad de trabajos realizados y turnos asignados." />
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

export default Dashboard;
