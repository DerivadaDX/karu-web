import React, { useState } from 'react';
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
  const [patente, setPatente] = useState();
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  const [kilometros, setKilometros] = useState('');
  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);
  // Para validar la patente
  const [isValid, setIsValid] = useState(true);
  // Para validar el km
  const [isKmValido, setIsKmValido] = useState(true);

  const msjTurnoCreado = `Se ha creado el turno de service para la patente ${patente} con ${kilometros} kilómetros para el día ${fecha} a las ${hora} en el taller ${taller}. Recibirá un mail con los datos mencionados. Por favor, recuerde asistir con cédula verde. Gracias.`;

  const [msjError, setMsjError] = useState();

  const marca = 'generico';
  const modelo = 'generico';
  const endPointDisponibilidad = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles-service/${taller}/${marca}/${modelo}/${kilometros}/`;

  const guardarPatente = (event) => {
    const { value } = event.target;
    if (ValidarPatente.isPatenteValida(value)) {
      setIsValid(true);
      setPatente(value);
    } else {
      setIsValid(false);
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
      }
    } else if (val === '') {
      setKilometros(val);
    }
  };

  // Endpoint: 'https://autotech2.onrender.com/turnos/crear-turno-service/'
  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line max-len
    if (taller && patente && isValid && fecha && hora && kilometros && isKmValido) {
      setOpenPopupSeleccion(true);
    } else {
      setOpenPopupNoSeleccion(true);
    }
    // Hacer los redondeos a la hora de mandar al back para crear el turno
    // if (val > 200000) {
    //   setKilometros(200000);
    // } else {
    //   setKilometros(Math.ceil(val / 5000) * 5000);
    // }
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
            {!isValid && <Alerts alertType="warning" description="Ejemplos de patentes válidas: AA111AA o ABC123" title="Patente inválida" />}
            <Talleres setTallerSeleccionado={setTaller} />
            {/* eslint-disable-next-line max-len */}
            {taller && <Disponibilidad endPoint={endPointDisponibilidad} setFecha={setFecha} setHora={setHora} msjError={setMsjError} />}
            {msjError && <Alerts alertType="error" description={msjError} title="No se encontró patente?." />}
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
                onClick={() => setOpenPopupSeleccion(false)}
              >
                Cerrar
              </Button>
            </Box>
          </Popup>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormularioCliente;
