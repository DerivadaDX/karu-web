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
  const {
    taller, setOpenAgregarTurno, openAgregarTurno, setActualizarTabla,
  } = props;
  // El endpoint toma número naturales y le estamos pasando un string 'T002', debería
  // tomar el 2
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
  // const [taller, setTaller] = useState(); -> Lo recibe del popup lo harcodeo por ahora
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

  const msjTurnoCreado = `Se ha creado el turno extraordinario para la patente ${patenteReparacion} el día ${fecha} a las ${hora}. Se evaluarán los daños y se podrá generar una reparación acorde.`;

  const [msjError, setMsjError] = useState();

  // Cambiar endpoint por el de excecpcional -> Uso el de disponibilidad común, pues me interesa
  // saber qué día está disponible, total dura una hora como cualquier evaluación
  const endPointDisponibilidad = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles/${tallerNro}/`;
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
      setOpenPopupCargando(true);
      setLoading(true);
      if (patenteReparacion && isValid && fecha && hora) {
        await axios({
          method: 'post',
          url: 'https://autotech2.onrender.com/turnos/crear-turno-extraordinario/',
          data: {
            patente: patenteReparacion,
            fecha_inicio: fecha,
            hora_inicio: hora,
            taller_id: tallerNro,
          },
        });
        setOpenPopupSeleccion(true);
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
    <Container component="main" maxWidth="md">
      <Box sx={{
        my: { xs: 1, md: 2 }, p: { xs: 1, md: 2 }, borderWidth: '2px', borderColor: 'silver', borderStyle: 'solid', borderRadius: '5px',
      }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ marginBottom: 3, marginTop: 1 }}>
            <LittleHeader titulo="Alta para turno extraodinario" />
          </Box>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Por favor, ingrese la patente del vehículo al cual desea atender.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: '90%' }}
              id="patente"
              label="Patente"
              name="patente"
              autoFocus
              inputProps={{ minLength: 6, maxLength: 7 }}
              onChange={guardarPatente}
            />
            {!isValid && <Alerts alertType="warning" description="Ejemplos de patentes válidas: AA111AA o ABC123" title="Patente inválida" />}
            {/* eslint-disable-next-line max-len */}
            <Box sx={{ width: '90%' }}>
              {patenteReparacion
                && (
                  <Disponibilidad
                    endPoint={endPointDisponibilidad}
                    setFecha={setFecha}
                    setHora={setHora}
                    msjError={setMsjError}
                    limite={limite}
                  />
                )}
            </Box>
            {msjError && <Alerts alertType="error" description={msjError} title="Surgió un error." />}
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, gap: '16px',
            }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="medium"
                disabled={loading}
              >
                Crear Turno
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => {
                  setOpenAgregarTurno(false);
                  setActualizarTabla(true);
                }}
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
            title={<LittleHeader titulo="Error en datos requeridos." />}
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
                color="success"
                variant="outlined"
                onClick={() => {
                  setOpenPopupSeleccion(false);
                  setOpenAgregarTurno(false);
                  setActualizarTabla(true);
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
            disableBackdropClick
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Alerts alertType={alertError} description={alertMensaje} title={alertTitulo} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                onClick={() => setOpenError(false)}
                variant="outlined"
                color="primary"
              >
                Cerrar
              </Button>
            </Box>
          </Popup>
        </Box>
      </Box>
    </Container>
  );
};

export default FormularioExtraordinario;
