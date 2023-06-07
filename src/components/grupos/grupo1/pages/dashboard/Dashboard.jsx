/* eslint-disable jsx-a11y/iframe-has-title */
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArticleIcon from '@mui/icons-material/Article';
import { Box } from '@mui/material';
import Header from '../../components/common/Header';
import TablaTurnosEnProgreso from '../visualizar-agenda/TablaTurnosEnProgreso';
import LittleTitle from '../../components/common/LittleTitle';

const idTaller = 'T002';
const idTecnico = '46';

const Home = () => {
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
          <Header titulo="Dashboard" subtitulo="Inicio" />
        </Box>
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
      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {/*         <Grid item xs={6} sm={3} md={3} lg={3}>
          <Paper
            className="mb-2"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              borderRadius: '15px',
              borderBottom: '4px solid',
              borderBottomColor: 'secondary.main',
            }}
            elevation={5}
          >
            <LittleTitle title="Clientes Atendidos" />
            <CardContent />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              borderBottom: '4px solid',
              borderBottomColor: 'secondary.main',
            }}
            elevation={5}
            style={{ borderRadius: 15 }}
          >
            <LittleTitle title="Turnos Pendientes" />
            <CardContent />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              borderBottom: '4px solid',
              borderBottomColor: 'secondary.main',
            }}
            elevation={5}
            style={{ borderRadius: 15 }}
          >
            <LittleTitle title="Evaluaciones Hechas" />
            <CardContent />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              borderBottom: '4px solid',
              borderBottomColor: 'secondary.main',
            }}
            elevation={5}
            style={{ borderRadius: 15 }}
          >
            <LittleTitle title="Tecnicos " />
            <CardContent />
          </Paper>
        </Grid> */}

          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '4px solid',
                borderBottomColor: 'secondary.main',
              }}
              elevation={5}
              style={{ borderRadius: 15 }}
            >
              <LittleTitle title="Turnos en progreso" icon={<ArticleIcon sx={{ marginRight: '10px', color: 'darkgray' }} />} />
              <TablaTurnosEnProgreso idTaller={idTaller} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
