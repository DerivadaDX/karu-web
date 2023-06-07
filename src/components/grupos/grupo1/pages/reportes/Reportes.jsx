/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArticleIcon from '@mui/icons-material/Article';
import { Box, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import TablaTurnosEnProgreso from '../visualizar-agenda/TablaTurnosEnProgreso';
import LittleTitle from '../../components/common/LittleTitle';

const idTaller = 'T002';
const idTecnico = '46';

const Reportes = () => {
  const url = `http://metabase-insomnia.sytes.net:8080/public/dashboard/20101951-c26b-4a67-b631-d7e21154bad0?id_tecnico=${idTecnico}`;

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
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 2,
      }}
      >
        <iframe
          src={url}
          width="1900rem"
          height="900rem"
          style={iframeStyles}
        />
      </Box>
      <Paper
        elevation={11}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: 2,
          p: 2,
          backgroundColor: 'white',
          // borderBottom: '4px solid',
          // borderBottomColor: 'secondary.main',
          boxShadow: '0 5px 10px rgba(51, 51, 51, 0.6)',
          border: '1px solid #acacac',
          borderRadius: '10px',
        }}
      >
        <LittleTitle title="Turnos en progreso" icon={<ArticleIcon sx={{ marginRight: '10px', color: 'darkgray' }} />} />
        <TablaTurnosEnProgreso idTaller={idTaller} />
      </Paper>
    </>
  );
};

export default Reportes;
