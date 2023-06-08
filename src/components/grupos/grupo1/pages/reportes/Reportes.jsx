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
  // El endpoint toma número naturales y le estamos pasando un string 'T002', debería
  // tomar el 2
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
  const tallerNro = obtenerPrimerNumero(idTaller);

  const urlTurnosPendientes = `http://metabase-insomnia.sytes.net:8080/public/question/6c42987a-9c30-41a3-98b8-f78601aa9007?id_taller=${tallerNro}#hide_parameters=id_taller`;

  const urlTurnosPorTipo = `http://metabase-insomnia.sytes.net:8080/public/question/d1c70595-7335-4619-ae09-24a1e20e7893?id_taller=${tallerNro}#hide_parameters=id_taller`;

  const urlTurnosPorEstado = `http://metabase-insomnia.sytes.net:8080/public/question/486a6332-75cb-44c4-9f74-e56de89a3dc1?id_taller=${tallerNro}#hide_parameters=id_taller`;

  const urlCantPendientes = `http://metabase-insomnia.sytes.net:8080/public/question/2c339de3-0e69-4a52-b294-324f1171da19?id_taller=${tallerNro}#hide_parameters=id_taller`;

  const urlUsoDelTaller = `http://metabase-insomnia.sytes.net:8080/public/question/d7c37022-664f-4199-8876-3fcea079a92f?desde=2023-06-07&hasta=2023-06-17&id_taller=${tallerNro}#hide_parameters=id_taller`;

  const iframeStyles = {
    border: '1px solid #acacac',
    borderRadius: '10px',
    boxShadow: '0 5px 10px rgba(51, 51, 51, 0.6)',
  };

  return (
    <>
      <Box m="2px">
        <Box display="flex">
          <Header titulo="Reportes" subtitulo="Inicio" />
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
