/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import DatosForm from './DatosForm';
import turno from '../turno.json';

const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="/">
      Autotech
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

const steps = ['Formulario para sacar un turno'];

const theme = createTheme();

export default function TurnoForm() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [isPatenteValid, setIsPatenteValid] = React.useState(true);

  const [showAlert, setShowAlert] = React.useState(false);

  const [alertMessage, setAlertMessage] = React.useState('');

  function getContent() {
    return <DatosForm setIsPatenteValid={setIsPatenteValid} />;
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  function isDatosCompletos() {
    let completo = true;

    if (turno.fecha_inicio === '' || turno.hora_inicio === '' || turno.taller_id === ''
      || turno.patente === '' || turno.tipo === ''
      || (turno.tipo === 'service' && turno.frecuencia_km === null)) {
      completo = false;
    }
    return completo;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isDatosCompletos() && isPatenteValid) {
        await axios({
          method: 'post',
          url: 'https://autotech2.onrender.com/turnos/turnos-create/',
          data: {
            fecha_inicio: turno.fecha_inicio,
            fecha_fin: turno.fecha_fin,
            hora_inicio: turno.hora_inicio,
            hora_fin: turno.hora_fin,
            taller_id: turno.taller_id,
            patente: turno.patente,
            tipo: turno.tipo,
            frecuencia_km: turno.frecuencia_km,
            estado: turno.estado,
          },
        });
        // console.log('Se crea el turno con:', turno);
        handleNext();
        // return response;
      } else {
        setAlertMessage('Complete todos los campos y verifique errores, por favor.');
      }
    } catch (error) {
      setAlertMessage('Surgió un error, vuelva a intentar.');
      // console.log(error.response.data);
    }

    setShowAlert(true);
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Autotech
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Turno
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Gracias por sacar su turno.
              </Typography>
              <Typography variant="subtitle1">
                Por favor, recuerde asistir con cédula verde al taller. Gracias.
              </Typography>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              {getContent()}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  Enviar Datos
                  {/* console.log(turno) */}
                </Button>
              </Box>
              {showAlert && (
                <Alert severity="error" onClose={handleCloseAlert}>
                  {alertMessage}
                </Alert>
              )}
            </form>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
