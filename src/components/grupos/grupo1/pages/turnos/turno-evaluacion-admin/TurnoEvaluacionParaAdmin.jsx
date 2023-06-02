import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Disponibilidad from '../Componentes/FechasHorarios';
import Talleres from '../Componentes/Talleres';
import ValidarPatente from '../Helpers/validar-patente';
import Alerts from '../../../components/common/Alerts';
import Popup from '../../../components/common/DialogPopup';

const FormularioEvaluacionAdmin = () => {
  const [taller, setTaller] = useState();
  const [patenteTurno, setPatente] = useState();
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);
  // Para validar la patente
  const [isPatenteValida, setIsPatenteValida] = useState(true);

  const msjTurnoCreado = `Se ha creado el turno de evaluación para la patente ${patenteTurno} para el día ${fecha} a las ${hora} en el taller ${taller}. Gracias.`;

  const [msjError, setMsjError] = useState('');

  const endPointDisponibilidad = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles/${taller}/`;
  // Para setear el límite del calendario
  const limite = 31;

  // Para el manejo de errores de la API para crear el turno
  const [openError, setOpenError] = useState(false);
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  const guardarPatente = (event) => {
    const { value } = event.target;
    if (ValidarPatente.isPatenteValida(value)) {
      setIsPatenteValida(true);
      setPatente(value);
    } else {
      setIsPatenteValida(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (msjError !== '') {
        setOpenPopupNoSeleccion(true);
      } else if (
        taller && patenteTurno && isPatenteValida && fecha && hora) {
        await axios({
          method: 'post',
          url: 'https://autotech2.onrender.com/turnos/crear-turno-evaluacion-presencial/',
          data: {
            patente: patenteTurno,
            fecha_inicio: fecha,
            hora_inicio: hora,
            taller_id: taller,
          },
        });
        setOpenPopupSeleccion(true);
      } else {
        setOpenPopupNoSeleccion(true);
      }
    } catch (error) {
      // error: la patente ingresada ya tiene un turno del mismo tipo para ese mismo dia
      // error: la patente ingresada ya tiene un turno de ese tipo registrado en el sistema.
      if (error.response.data.includes('la patente ingresada ya tiene un turno de ese tipo registrado en el sistema')) {
        setOpenError(true);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un problema');
        setAlertMensaje('Ya existe un turno para esa patente y tipo de turno.');
      } else {
        setOpenError(true);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un error');
        setAlertMensaje('Si el problema persiste, comuniquese con insomnia.front@gmail.com');
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 5 }}>
            Turno para Evaluación (Administrativos)
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ minWidth: '25em' }}
              autoFocus
              id="patente"
              label="Patente"
              name="patente"
              inputProps={{ minLength: 6, maxLength: 7 }}
              onChange={guardarPatente}
            />
            {!isPatenteValida && <Alerts alertType="warning" description="Ejemplos de patentes válidas: AA111AA o ABC123" title="Patente inválida" />}
            <Talleres setTallerSeleccionado={setTaller} />
            {patenteTurno
              && taller
              && (
                <Disponibilidad
                  endPoint={endPointDisponibilidad}
                  setFecha={setFecha}
                  setHora={setHora}
                  msjError={setMsjError}
                  limite={limite}
                />
              )}
            {msjError && <Alerts alertType="error" description={msjError} title="Hubo un error en la disponibilidad." />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Reservar Turno
            </Button>
          </Box>
          <Popup
            title="Error en datos requeridos."
            description="Por favor complete todos los campos y verifique la correctitud de la patente."
            openDialog={openPopupNoSeleccion}
            setOpenDialog={setOpenPopupNoSeleccion}
          >
            <Box
              sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
            >
              <Button
                color="error"
                onClick={() => setOpenPopupNoSeleccion(false)}
              >
                Cerrar
              </Button>
            </Box>
          </Popup>
          <Popup
            title="Turno reservado con éxito."
            description={msjTurnoCreado}
            openDialog={openPopupSeleccion}
            setOpenDialog={setOpenPopupSeleccion}
          >
            <Box
              sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
            >
              <Button
                color="success"
                onClick={() => setOpenPopupSeleccion(false)}
              >
                Cerrar
              </Button>
            </Box>
          </Popup>
          {/* Popup para mostrar mensaje de error, cuando sea enviado el turno */}
          <Popup
            openDialog={openError}
            setOpenDialog={setOpenError}
            title="Ha ocurrido un problema"
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Alerts alertType={alertError} description={alertMensaje} title={alertTitulo} />
            </Box>
          </Popup>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormularioEvaluacionAdmin;
