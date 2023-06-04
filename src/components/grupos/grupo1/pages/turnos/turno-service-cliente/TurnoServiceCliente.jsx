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
import ValidarKm from '../Helpers/validar-km';
import Alerts from '../../../components/common/Alerts';
import Popup from '../../../components/common/DialogPopup';

const FormularioCliente = () => {
  const [taller, setTaller] = useState();
  const [patenteTurno, setPatente] = useState();
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  // Para mostrar en la pantalla lo que pone el cliente
  const [kilometros, setKilometros] = useState('');
  // Para crear el turno, redondeado
  const [frecuenciaKm, setFrecuenciaKM] = useState('');
  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);
  // Para validar la patente
  const [isPatenteValida, setIsPatenteValida] = useState(true);
  // Para validar el km
  const [isKmValido, setIsKmValido] = useState(true);

  const msjTurnoCreado = `Se ha creado el turno de service para la patente ${patenteTurno} con ${kilometros} kilómetros para el día ${fecha} a las ${hora} en el taller ${taller}. Recibirá un mail con los datos mencionados. Por favor, recuerde asistir con cédula verde. Gracias.`;

  const [msjError, setMsjError] = useState('');

  const marca = 'generico';
  const modelo = 'generico';
  const endPointDisponibilidad = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles-service/${taller}/${marca}/${modelo}/${frecuenciaKm}/`;
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

  const guardarKilometraje = (e) => {
    const val = e.target.value;

    if (e.target.validity.valid) {
      if (ValidarKm.isKilometroValid(val)) {
        setIsKmValido(true);
      } else {
        setIsKmValido(false);
      }
      if (ValidarKm.isKmNros(val)) {
        setKilometros(val);
        const km = ValidarKm.redondearKm(val);
        setFrecuenciaKM(km);
      }
    } else if (val === '') {
      setKilometros(val);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (msjError !== '') {
      setOpenPopupNoSeleccion(true);
    } else if (
      taller && patenteTurno && isPatenteValida && fecha && hora && frecuenciaKm && isKmValido) {
      try {
        await axios({
          method: 'post',
          url: 'https://autotech2.onrender.com/turnos/crear-turno-service/',
          data: {
            patente: patenteTurno,
            fecha_inicio: fecha,
            hora_inicio: hora,
            frecuencia_km: frecuenciaKm,
            taller_id: taller,
          },
        });
        setOpenPopupSeleccion(true);
      } catch (error) {
        if (error.response && error.response.data) {
          const responseData = error.response.data;
          if (responseData.includes('la patente ingresada ya tiene un turno de ese tipo registrado en el sistema')) {
            setOpenError(true);
            setAlertError('error');
            setAlertTitulo('No se puede asignar un turno');
            setAlertMensaje('Ya existe un turno para esa patente y tipo de turno.');
            // Hablar con Luci, porque pongo una patente que tiene turno y su error dice que
            // no pertenece a un cliente y entra acá, y en realidad debería entrar en el de arriba
          } else if (responseData.includes('la patente no está registrada como perteneciente a un cliente')) {
            setOpenError(true);
            setAlertError('error');
            setAlertTitulo('Error de patente');
            setAlertMensaje('La patente ingresada no pertenece a ningún cliente.');
          } else {
            setOpenError(true);
            setAlertError('error');
            setAlertTitulo('Ha ocurrido un error');
            setAlertMensaje('Si el problema persiste, comuníquese con insomnia.front@gmail.com');
          }
        } else {
          setOpenError(true);
          setAlertError('error');
          setAlertTitulo('Ha ocurrido un error');
          setAlertMensaje('Si el problema persiste, comuníquese con insomnia.front@gmail.com');
        }
      }
    } else {
      setOpenPopupNoSeleccion(true);
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
            Turno para Service
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              id="patente"
              label="Patente"
              name="patente"
              inputProps={{ minLength: 6, maxLength: 7 }}
              onChange={guardarPatente}
            />
            {!isPatenteValida && <Alerts alertType="warning" description="Ejemplos de patentes válidas: AA111AA o ABC123" title="Patente inválida" />}
            <TextField
              margin="normal"
              required
              fullWidth
              value={kilometros}
              id="kilometraje"
              label="Kilometraje"
              name="kilometraje"
              type="tel"
              pattern="[1-9][0-9]*"
              inputProps={{ maxLength: 6 }}
              onChange={guardarKilometraje}
            />
            {!isKmValido && <Alerts alertType="warning" description="Coberturas válidas: de 5000 a 200000 km." title="Kilometraje inválido" />}
            <Talleres setTallerSeleccionado={setTaller} />
            {patenteTurno
              && frecuenciaKm && taller
              && (
                <Disponibilidad
                  endPoint={endPointDisponibilidad}
                  setFecha={setFecha}
                  setHora={setHora}
                  msjError={setMsjError}
                  limite={limite}
                />
              )}
            {msjError && <Alerts alertType="error" description={msjError} title="No se encontró service." />}
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
            description="Por favor complete todos los campos y verifique la correctitud del DNI, la patente y el kilometraje."
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
                // onClick={() => setOpenPopupSeleccion(false)}
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

export default FormularioCliente;
