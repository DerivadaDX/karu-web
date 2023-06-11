/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Disponibilidad from '../Componentes/FechasHorarios';
import ValidarPatente from '../Helpers/validar-patente';
import Alerts from '../../../components/common/Alerts';
import Popup from '../../../components/common/DialogPopup';
import LittleHeader from '../../../components/common/LittleHeader';

const Formulario = (props) => {
  const {
    taller, openAgregarTurno, setOpenAgregarTurno, setActualizarTabla,
  } = props;

  function obtenerPrimerNumero(str) {
    // Expresión regular para encontrar el primer número que comienza con un dígito distinto de cero
    const regex = /[1-9][0-9]*/;

    // Buscar el primer número en el string
    const match = str.match(regex);

    // Devolver el número encontrado o null si no se encontró ninguna coincidencia
    if (match !== null) {
      // eslint-disable-next-line radix
      return parseInt(match[0]);
    }
    return null;
  }
  const tallerNro = obtenerPrimerNumero(taller);

  const [patenteReparacion, setPatente] = useState();
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();

  const [loading, setLoading] = useState(false);
  const [openPopupCargando, setOpenPopupCargando] = useState(false);

  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);
  // Para validar la patente
  const [isValid, setIsValid] = useState(true);

  const msjTurnoCreado = `Se ha creado el turno para la patente ${patenteReparacion} el día ${fecha} a las ${hora} en el taller ${tallerNro}.`;

  const [msjError, setMsjError] = useState();

  const [origenReparacion, setOrigenReparacion] = React.useState('');

  const endPointDisponibilidad = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles-reparaciones/${tallerNro}/${patenteReparacion}/${origenReparacion}/`;
  // Para setear el límite del calendario
  const limite = 45;

  // Para el manejo de errores de la API para crear el turno
  const [openError, setOpenError] = useState(false);
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState([]);
  const [alertTitulo, setAlertTitulo] = useState('');

  const guardarOrigen = (event) => {
    setOrigenReparacion(event.target.value);
  };

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
      setOpenPopupCargando(true);
      setLoading(true);
      if (taller && patenteReparacion && isValid && fecha && hora && origenReparacion) {
        await axios({
          method: 'post',
          url: 'https://autotech2.onrender.com/turnos/crear-turno-reparacion/',
          data: {
            patente: patenteReparacion,
            fecha_inicio: fecha,
            hora_inicio: hora,
            taller_id: tallerNro,
            origen: origenReparacion,
          },
        });
        setOpenPopupSeleccion(true);
        setActualizarTabla(true);
      } else {
        setOpenPopupNoSeleccion(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        setOpenError(true);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un problema');
        setAlertMensaje(responseData);
      } else {
        setOpenError(true);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un error');
        setAlertMensaje(error.response.data);
      }
    } finally {
      setLoading(false);
      setOpenPopupCargando(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
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
          <Typography component="h1" variant="h5" sx={{ marginBottom: 3 }}>
            <LittleHeader titulo="Alta para turno para reparación" />
          </Typography>
          <Typography variant="body1" sx={{ marginBotton: 2 }}>
            Por favor, primero seleccione el origen del turno
            y complete los campos correspondientes a continuación.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl sx={{ m: 3 }} variant="standard">
              <FormLabel id="demo-error-radios">Origen del turno</FormLabel>
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                value={origenReparacion}
                onChange={guardarOrigen}
              >
                <FormControlLabel value="evaluacion" control={<Radio />} label="Evaluación" />
                <FormControlLabel value="extraordinario" control={<Radio />} label="Extraordinario" />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="patente"
              label="Patente"
              name="patente"
              autoFocus
              inputProps={{ minLength: 6, maxLength: 7 }}
              onChange={guardarPatente}
            />
            {!isValid && <Alerts alertType="warning" description="Ejemplos de patentes válidas: AA111AA o ABC123" title="Patente inválida" />}
            {/* eslint-disable-next-line max-len */}
            {patenteReparacion && origenReparacion && <Disponibilidad endPoint={endPointDisponibilidad} setFecha={setFecha} setHora={setHora} msjError={setMsjError} limite={limite} />}
            {msjError && <Alerts alertType="error" description={msjError} title="No se encontró evaluación asociada." />}
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3, gap: '16px',
            }}
            >
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                color="secondary"
                disabled={loading}
              >
                Crear Turno
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => setOpenAgregarTurno(false)}
              >
                Atrás
              </Button>
            </Box>
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
            description="Por favor complete todos los campos y verifique que la patente sea correcta."
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
            title={<LittleHeader titulo="Turno creado con éxito" />}
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
                onClick={() => setOpenAgregarTurno(false)}
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

export default Formulario;
