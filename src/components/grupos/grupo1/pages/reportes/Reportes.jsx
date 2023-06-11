/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArticleIcon from '@mui/icons-material/Article';
import { Box, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import TablaTurnosEnProgreso from '../visualizar-agenda/TablaTurnosEnProgreso';
import LittleTitle from '../../components/common/LittleTitle';

const idTaller = 'T002';

const Reportes = () => {
  function obtenerPrimerNumero(str) {
    // Expresión regular para encontrar el primer número que comienza con un dígito distinto de cero
    const regex = /[1-9][0-9]*/;

    // Buscar el primer número en el string
    const match = str.match(regex);

    // Devolver el número encontrado o null si no se encontró ninguna coincidencia
    if (match !== null) {
      // eslint-disable-next-line radix
      return parseInt(match[0]);
    }
    return null;
  }

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

  // por defecto se muestra desde el 1 de enero hasta el día siguiente al actual
  const fechaHasta = `${anio}-${mes}-${dia}`;
  const fechaDesde = `${anio}-01-01`;

  const tallerNro = obtenerPrimerNumero(idTaller);

  const urlTurnosPendientes = `http://metabase-insomnia.sytes.net/public/question/42520032-1c9a-4446-b4e8-fcbfd28af258?id_taller=${tallerNro}#hide_parameters=id_taller`;

  const urlTurnosPorTipo = `http://metabase-insomnia.sytes.net/public/question/4afcdc6e-57f4-4c53-8183-57b46c1f20e9?id_taller=${tallerNro}#hide_parameters=id_taller`;

  const urlTurnosPorEstado = `http://metabase-insomnia.sytes.net/public/question/330214cb-ec3c-4a42-804b-9da35e2e9d7b?id_taller=${tallerNro}#hide_parameters=id_taller`;

  const urlCantPendientes = `http://metabase-insomnia.sytes.net/public/question/19c4c0d8-f5f8-42b4-bc08-f76a760ceb3b?id_taller=${tallerNro}#hide_parameters=id_taller`;

  const urlUsoDelTaller = `http://metabase-insomnia.sytes.net/public/question/a25e0ac3-dbea-4ca5-82e4-29444b7c6a78?id_taller=${tallerNro}&hasta=${fechaHasta}&desde=${fechaDesde}#hide_parameters=id_taller`;

  const iframeStyles = {
    border: '1px solid #acacac',
    borderRadius: '10px',
    boxShadow: '0 5px 10px rgba(51, 51, 51, 0.6)',
  };

  return (
    <>
      <Box m="2px">
        <Box display="flex">
          <Header titulo="Reportes" subtitulo="Visualización del estado de turnos y el uso del taller" />
        </Box>
        <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)' }} />
      </Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={12} md={4}>
          <iframe
            src={urlCantPendientes}
            width="100%"
            height="450rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <iframe
            src={urlTurnosPorEstado}
            width="100%"
            height="450rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <iframe
            src={urlTurnosPendientes}
            width="100%"
            height="400rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <iframe
            src={urlTurnosPorTipo}
            width="100%"
            height="400rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <iframe
            src={urlUsoDelTaller}
            width="100%"
            height="400rem"
            style={iframeStyles}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Reportes;
