/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import * as React from 'react';
import { Box, Divider } from '@mui/material';
import Header from '../../components/common/Header';

const idTecnico = '46';

const Home = () => {
  const url = `http://metabase-insomnia.sytes.net:8080/public/dashboard/20101951-c26b-4a67-b631-d7e21154bad0?id_tecnico=${idTecnico}#hide_parameters=id_tecnico`;

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
    </>
  );
};

export default Home;
