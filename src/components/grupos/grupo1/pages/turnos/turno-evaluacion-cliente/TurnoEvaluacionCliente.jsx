import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InfoIcon from '@mui/icons-material/Info';
import Disponibilidad from '../Componentes/FechasHorarios';
import Talleres from '../Componentes/Talleres';
import ValidarPatente from '../Helpers/validar-patente';
import Alerts from '../../../components/common/Alerts';
import Popup from '../../../components/common/DialogPopup';
import LittleHeader from '../../../components/common/LittleHeader';

const FormularioEvaluacionCliente = () => {
  const [taller, setTaller] = useState();
  const [patenteTurno, setPatente] = useState();
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();

  const [loading, setLoading] = useState(false);
  const [openPopupCargando, setOpenPopupCargando] = useState(false);

  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);
  // Para validar la patente
  const [isPatenteValida, setIsPatenteValida] = useState(true);

  const msjTurnoCreado = `Se ha creado el turno de evaluación para la patente ${patenteTurno} para el día ${fecha} a las ${hora} en el taller ${taller}. En breve recibirá un mail con todos los datos. Recuerde asistir con cédula verde. Gracias.`;

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
    if (msjError !== '') {
      setOpenPopupNoSeleccion(true);
    } else if (
      taller && patenteTurno && isPatenteValida && fecha && hora) {
      try {
        setOpenPopupCargando(true);
        setLoading(true);
        await axios({
          method: 'post',
          url: 'https://autotech2.onrender.com/turnos/crear-turno-evaluacion-web/',
          data: {
            patente: patenteTurno,
            fecha_inicio: fecha,
            hora_inicio: hora,
            taller_id: taller,
          },
        });
        setOpenPopupSeleccion(true);
      } catch (error) {
        if (error.response && error.response.data) {
          const responseData = error.response.data;
          setOpenError(true);
          setAlertError('error');
          setAlertTitulo('Ha ocurrido un problema');
          setAlertMensaje(responseData);
          setOpenPopupCargando(false);
          setLoading(false);
        } else {
          setOpenError(true);
          setAlertError('error');
          setAlertTitulo('Ha ocurrido un error');
          setAlertMensaje('Si el problema persiste, comuniquese con insomnia.front@gmail.com');
          setOpenPopupCargando(false);
          setLoading(false);
        }
      } finally {
        setLoading(false);
        setOpenPopupCargando(false);
      }
    } else {
      setOpenPopupNoSeleccion(true);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="elevation">
        <Typography
          component="h2"
          sx={{
            display: 'flex', alignContent: 'center', fontSize: '1rem',
          }}
        >
          <InfoIcon color="secondary" />
          Podés agendar una evaluación gratuita de tu vehículo en nuestros talleres
          para determinar su estado y valor de venta.
        </Typography>
      </Paper>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Turno para evaluación vehicular
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
              disabled={loading}
            >
              Reservar Turno
            </Button>
          </Box>
          {loading && (
            <Popup
              title={<LittleHeader titulo="Enviando datos" />}
              description="Estamos procesando los datos para confirmar su turno. Por favor, espere un momento..."
              openDialog={openPopupCargando}
              setOpenDialog={setOpenPopupCargando}
            />
          )}

          <Popup
            title={<LittleHeader titulo="Error en datos requeridos" />}
            description="Por favor complete todos los campos y verifique la correctitud de la patente."
            openDialog={openPopupNoSeleccion}
            setOpenDialog={setOpenPopupNoSeleccion}
            disableBackdropClick
          >
            <Box
              sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
            >
              <Button
                color="error"
                variant="outlined"
                onClick={() => setOpenPopupNoSeleccion(false)}
              >
                Cerrar
              </Button>
            </Box>
          </Popup>
          <Popup
            title={<LittleHeader titulo="Turno reservado con éxito" />}
            description={msjTurnoCreado}
            openDialog={openPopupSeleccion}
            setOpenDialog={setOpenPopupSeleccion}
            disableBackdropClick
          >
            <Box
              sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
            >
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                Cerrar
              </Button>
            </Box>
          </Popup>
          {/* Popup para mostrar mensaje de error, cuando sea enviado el turno */}
          <Popup
            openDialog={openError}
            setOpenDialog={setOpenError}
            title={<LittleHeader titulo="Ha ocurrido un problema" />}
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

export default FormularioEvaluacionCliente;
