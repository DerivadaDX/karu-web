/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Disponibilidad from '../Componentes/FechasHorarios';
import ValidarPatente from '../Helpers/validar-patente';
import Alerts from '../../../components/common/Alerts';
import Popup from '../../../components/common/DialogPopup';
import LittleHeader from '../../../components/common/LittleHeader';

// Recibe el taller con el contexto
// (tal vez en el popup que abre al agregar turno se lo puede pasar)

const FormularioExtraordinario = (props) => {
  const { taller, setOpenAgregarTurno, openAgregarTurno } = props;
  // const [taller, setTaller] = useState(); -> Lo recibe del popup lo harcodeo por ahora
  const [patenteReparacion, setPatente] = useState();
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);
  // Para validar la patente
  const [isValid, setIsValid] = useState(true);

  const msjTurnoCreado = `Se ha creado el turno extraordinario para la patente ${patenteReparacion} el día ${fecha} a las ${hora}. Se evaluarán los daños y se podrá generar una reparación acorde.`;

  const [msjError, setMsjError] = useState();

  // Cambiar endpoint por el de excecpcional -> Uso el de disponibilidad común, pues me interesa
  // saber qué día está disponible, total dura una hora como cualquier evaluación
  const endPointDisponibilidad = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles/${taller}/`;
  // Para setear el límite del calendario
  const limite = 45;

  // Para el manejo de errores de la API para crear el turno
  const [openError, setOpenError] = useState(false);
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  const guardarPatente = (event) => {
    const { value } = event.target;
    if (ValidarPatente.isPatenteValida(value)) {
      setIsValid(true);
      setPatente(value);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (patenteReparacion && isValid && fecha && hora) {
        await axios({
          method: 'post',
          url: 'https://autotech2.onrender.com/turnos/crear-turno-extraordinario/',
          data: {
            patente: patenteReparacion,
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
    <Container component="main" maxWidth="sm">
      <Paper variant="outlined" sx={{ my: { xs: 1, md: 3 }, p: { xs: 2, md: 3 } }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ marginBottom: 3, marginTop: 1 }}>
            <LittleHeader titulo="Alta para turno extraodinario" />
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Por favor, ingrese la patente del vehículo al cual desea atender.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ minWidth: '16.5em' }}
              id="patente"
              label="Patente"
              name="patente"
              autoFocus
              inputProps={{ minLength: 6, maxLength: 7 }}
              onChange={guardarPatente}
            />
            {!isValid && <Alerts alertType="warning" description="Ejemplos de patentes válidas: AA111AA o ABC123" title="Patente inválida" />}
            {/* eslint-disable-next-line max-len */}
            {patenteReparacion && <Disponibilidad endPoint={endPointDisponibilidad} setFecha={setFecha} setHora={setHora} msjError={setMsjError} limite={limite} />}
            {msjError && <Alerts alertType="error" description={msjError} title="Surgió un error." />}
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3, gap: '16px',
            }}
            >
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                color="secondary"
                size="medium"
                // sx={{ mt: 1, mb: 2, mr: 1 }}
              >
                Crear Turno
              </Button>
              <Button
                // fullWidth
                variant="contained"
                color="primary"
                size="medium"
                // sx={{ mt: 1, mb: 2, ml: 1 }}
                onClick={() => setOpenAgregarTurno(false)}
              >
                Atrás
              </Button>
            </Box>
          </Box>
          <Popup
            title="Error en datos requeridos."
            description="Por favor complete todos los campos y verifique que la patente sea correcta."
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
            title="Turno creado con éxito."
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

export default FormularioExtraordinario;
