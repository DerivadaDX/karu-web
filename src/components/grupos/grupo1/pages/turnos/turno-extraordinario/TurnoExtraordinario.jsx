import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Disponibilidad from '../Componentes/FechasHorarios';
// import Talleres from '../Componentes/Talleres';
import ValidarPatente from '../Helpers/validar-patente';
import Alerts from '../../../components/common/Alerts';
import Popup from '../../../components/common/DialogPopup';

// Recibe el taller con el contexto
// (tal vez en el popup que abre al agregar turno se lo puede pasar)

const FormularioExtraordinario = () => {
  // const [taller, setTaller] = useState(); -> Lo recibe del popup lo harcodeo por ahora
  const taller = 2;
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

  const guardarPatente = (event) => {
    const { value } = event.target;
    if (ValidarPatente.isPatenteValida(value)) {
      setIsValid(true);
      setPatente(value);
    } else {
      setIsValid(false);
    }
  };

  // Cambiar endpoint por el de excepcional
  // https://autotech2.onrender.com/turnos/crear-turno-extraordinario/
  /* Recibe:
  "patente": "AS123FD",
"fecha_inicio": "2023-10-23",
"hora_inicio": "12:00:00",
"taller_id": 10 */
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
            Turno Extraordinario
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
            {msjError && <Alerts alertType="error" description={msjError} title="No se encontró evaluación asociada de venta ni extraordinario." />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear Turno
            </Button>
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
        </Box>
      </Paper>
    </Container>
  );
};

export default FormularioExtraordinario;
