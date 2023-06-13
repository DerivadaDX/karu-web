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
import ValidarKm from '../Helpers/validar-km';
import Alerts from '../../../components/common/Alerts';
import Popup from '../../../components/common/DialogPopup';
import LittleHeader from '../../../components/common/LittleHeader';

const FormularioCliente = () => {
  const [taller, setTaller] = useState();
  const [patenteTurno, setPatente] = useState();
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  const [kilometros, setKilometros] = useState('');

  const [loading, setLoading] = useState(false);
  const [openPopupCargando, setOpenPopupCargando] = useState(false);

  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);
  // Para validar la patente
  const [isPatenteValida, setIsPatenteValida] = useState(true);
  // Para validar el km
  const [isKmValido, setIsKmValido] = useState(true);

  const [msjGarantia, setMsjGarantia] = useState('');
  // Para el botón de ver el estado de la garantía
  const [cargandoGarantia, setCargandoGarantia] = useState(false);
  const [cargando, setCargando] = useState(false);

  const msjTurnoCreado = `Se ha creado el turno de service para la patente ${patenteTurno} con ${kilometros} kilómetros para el día ${fecha} a las ${hora} en el taller ${taller}. Recibirá un mail con los datos mencionados. Por favor, recuerde asistir con cédula verde. Gracias.`;

  const [msjError, setMsjError] = useState('');

  const endPointDisponibilidad = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles-service/${taller}/${patenteTurno}/${kilometros}/`;
  const [mostrarDisponibilidad, setMostrarDisponibilidad] = useState('');
  // Para el botón de ver calendario
  const [cargandoCalendario, setCargandoCalendario] = useState(false);
  const [cargandoC, setCargandoC] = useState(false);
  // Para setear el límite del calendario
  const limite = 31; // El back devuelve 31 días, me adapté a eso

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
    // Para que si se cambia el km, deba volver a consultar el calendario
    setMostrarDisponibilidad(false);
    setMsjGarantia('');
    const val = e.target.value;

    if (e.target.validity.valid) {
      if (val >= 5000) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (msjError !== '') {
      setOpenPopupNoSeleccion(true);
    } else if (
      taller && patenteTurno && isPatenteValida && fecha && hora && kilometros && isKmValido) {
      try {
        setOpenPopupCargando(true);
        setLoading(true);
        await axios({
          method: 'post',
          url: 'https://autotech2.onrender.com/turnos/crear-turno-service/',
          data: {
            patente: patenteTurno,
            fecha_inicio: fecha,
            hora_inicio: hora,
            frecuencia_km: kilometros,
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
        } else {
          setOpenError(true);
          setAlertError('error');
          setAlertTitulo('Ha ocurrido un error');
          setAlertMensaje('Si el problema persiste, comuníquese con insomnia.front@gmail.com');
        }
      } finally {
        setLoading(false);
        setOpenPopupCargando(false);
      }
    } else {
      setOpenPopupNoSeleccion(true);
    }
  };

  // eslint-disable-next-line consistent-return
  const obtenerMsjGarantia = async () => {
    try {
      setCargandoGarantia(true);
      setCargando(true);
      const response = await axios.get(`https://autotech2.onrender.com/garantias/garantia-vigente/${patenteTurno}/${fecha}/${kilometros}/`);
      setMsjGarantia(response.data);
    } catch (error) {
      setMsjError(error.response.data);
      setCargando(false);
    } finally {
      setCargando(false);
      setCargandoGarantia(false);
    }
  };

  const consultarDisponibilidad = async () => {
    try {
      setCargandoCalendario(true);
      setCargandoC(true);
      const r = await axios.get(endPointDisponibilidad);
      if (r) { setMostrarDisponibilidad(true); }
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
        setAlertMensaje('Si el problema persiste, comuníquese con insomnia.front@gmail.com');
      }
    } finally {
      setCargandoC(false);
      setCargandoCalendario(false);
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
          Si compraste uno de nuestros vehículos, podés agendar un turno
          para realizar el service del vehículo en nuestros talleres.
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
            gap: '1rem',
            padding: '1rem',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Turno para service vehicular
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="patente"
              label="Patente"
              name="patente"
              inputProps={{ minLength: 6, maxLength: 7 }}
              onChange={guardarPatente}
              onSelect={guardarPatente}
            />
            {!isPatenteValida
              && (

                <Alerts alertType="warning" description="Ejemplos de patentes válidas: AA111AA o ABC123" title="Patente inválida" />

              )}

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
            {!isKmValido
              && (

                <Alerts alertType="warning" description="Coberturas válidas: a partir de 5000 km." title="Kilometraje inválido" />
              )}
            <Talleres setTallerSeleccionado={setTaller} />

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!taller || !patenteTurno || !isPatenteValida || !kilometros || cargandoC}
              sx={{ mt: 3, mb: 2 }}
              onClick={consultarDisponibilidad}
            >
              Ver Calendario
            </Button>

            {cargandoC && (
              <Popup
                title={<LittleHeader titulo="Procesando datos" />}
                description="Estamos procesando los datos para mostrar el calendario. Por favor, espere un momento..."
                openDialog={cargandoCalendario}
                setOpenDialog={setCargandoGarantia}
                disableBackdropClick
              />
            )}

            {mostrarDisponibilidad
              && (
                <Disponibilidad
                  endPoint={endPointDisponibilidad}
                  setFecha={setFecha}
                  setHora={setHora}
                  msjError={setMsjError}
                  limite={limite}
                />
              )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!taller || !patenteTurno || !isPatenteValida || !fecha || !hora
                || !kilometros || !isKmValido || cargando || !mostrarDisponibilidad}
              sx={{ mt: 3, mb: 2 }}
              onClick={obtenerMsjGarantia}
            >
              Consultar estado de la garantía
            </Button>

            {cargando && (
              <Popup
                title={<LittleHeader titulo="Procesando datos" />}
                description="Estamos procesando los datos para saber el estado de la garantía. Por favor, espere un momento..."
                openDialog={cargandoGarantia}
                setOpenDialog={setCargandoGarantia}
                disableBackdropClick
              />
            )}

            {taller && patenteTurno && isPatenteValida && fecha && hora && kilometros && isKmValido
              && !cargando && msjGarantia && msjError === '' && <Alerts alertType="info" description={msjGarantia} title="Garantía" />}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
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
              disableBackdropClick
            />
          )}
          <Popup
            title={<LittleHeader titulo="Error en datos requeridos" />}
            description="Por favor complete todos los campos y verifique la correctitud de la patente y el kilometraje."
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

export default FormularioCliente;
