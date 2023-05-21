/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-import-assign */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
// Calendario
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format } from 'date-fns';
import { Box, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

import InputLabel from '@mui/material/InputLabel';
import feriados from './feriados.json';
import disponibilidad from './disponibilidad.json';
import turno from '../turno.json';

/// //////////////////////////////////////////Taller select
const tallerAPI = axios.create({
  baseURL: 'https://autotech2.onrender.com/talleres_admin/',
});

const Talleres = () => {
  const [talleres, setTalleres] = useState([]);

  useEffect(() => {
    tallerAPI.get().then((response) => {
      setTalleres(response.data);
    });
  }, []);

  const [t, setT] = useState({
    taller: '',
  });

  const guardarCambio = (event) => {
    const { name, value } = event.target;
    setT((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    turno.taller_id = value;
    console.log(turno.taller_id);
  };

  return (
    <Box sx={{ m: 1, minWidth: 80 }}>
      <div className="stock-container">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Talleres</InputLabel>
          <Select
            required
            label="Talleres"
            type="text"
            name="taller"
            value={t.taller}
            onChange={guardarCambio}
          >
            {talleres.map((taller) => (
              <MenuItem key={taller.id_taller} value={taller.id_taller}>
                {taller.localidad}
              </MenuItem>
            ))}
          </Select>
          {
            t.taller !== '' && (
              <Stack spacing={3} width={300} padding={5}>
                <Grid item xs={12} md={10}>
                  <DateValidationShouldDisableDate />
                </Grid>
              </Stack>
            )
          }
        </FormControl>
      </div>
    </Box>
  );
};
/// ///////////////////////////////////Fin taller select

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const limite = dayjs().add(31, 'day');

/// //////////////////////Para traer la disponibilidad de un taller

const fetchAgendaData = async (idTaller) => {
  const agendaEndPoint = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles/${idTaller}/`;

  try {
    const response = await axios.get(agendaEndPoint);
    disponibilidad = response.data;
  } catch (error) {
    // console.error(error);
  }
};

const isFeriadoIsMas30Dias = (date) => {
  if (turno.taller_id === '') {
    return true;
  }

  const actual = format(new Date(date), 'yyyy-MM-dd');
  const hoy = format(new Date(today), 'yyyy-MM-dd');
  let isFeriado = false;

  // eslint-disable-next-line no-restricted-syntax
  for (const dia in feriados) { if (actual === feriados[dia]) { isFeriado = true; } }
  return isFeriado || date > limite || actual === hoy;
};
/// //////////Calendario, validaciones

const DateValidationShouldDisableDate = () => {
  const [dia, setDia] = React.useState(tomorrow);
  fetchAgendaData(turno.taller_id);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Stack spacing={3} width={300}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={10}>
              <MobileDatePicker
                required
                label="Fechas"
                value={dia}
                disablePast
                shouldDisableDate={isFeriadoIsMas30Dias}
                views={['year', 'month', 'day']}
                onChange={(newValue) => {
                  setDia(newValue);
                  turno.fecha_inicio = format(new Date(newValue), 'yyyy-MM-dd');
                  turno.fecha_fin = format(new Date(newValue), 'yyyy-MM-dd');
                }}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              {turno.fecha_inicio !== ''
                && (
                  <Hora
                    required
                    fecha={turno.fecha_inicio}
                    dias_y_horarios={disponibilidad.dias_y_horarios}
                  />
                )}
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box>
//         <Stack spacing={3} width={300}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={10}>
//               <FormControl required>
//                 <InputLabel>Fechas</InputLabel>
//                 <Select
//                   label="Fechas"
//                   fullWidth
//                   value={dia}
//                   onChange={(e) => {
//                     const newValue = e.target.value;
//                     setDia(newValue);
//                     turno.fecha_inicio = format(new Date(newValue), 'yyyy-MM-dd');
//                     turno.fecha_fin = format(new Date(newValue), 'yyyy-MM-dd');
//                   }}
//                 >
//                   {disponibilidad
//                     && disponibilidad.dias_y_horarios
//                     && disponibilidad.dias_y_horarios.map((item) => (
//                       <MenuItem
//                         key={item.dia}
//                         value={item.dia}
//                         disabled={isFeriadoIsMas30Dias(item.dia)}
//                       >
//                         {format(new Date(item.dia), 'yyyy-MM-dd')}
//                       </MenuItem>
//                     ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={10}>
//               {turno.fecha_inicio !== ''
//                 && (
//                   <Hora
//                     required
//                     fecha={turno.fecha_inicio}
//                     dias_y_horarios={disponibilidad.dias_y_horarios}
//                   />
//                 )}
//             </Grid>
//           </Grid>
//         </Stack>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// eslint-disable-next-line camelcase
const Hora = ({ dias_y_horarios, fecha }) => {
  const [hora, setHora] = React.useState('');

  const handleHoraChange = (event) => {
    const selectedValue = event.target.value;
    setHora(selectedValue);
    turno.hora_inicio = `${parseInt(selectedValue, 10)}:00:00`;
    h = parseInt(selectedValue, 10) + 1;
    turno.hora_fin = `${h}:00:00`;
  };

  let h;

  const horariosDisponibles = dias_y_horarios
    ?.find((item) => item.dia === fecha)?.horarios_disponibles;

  return (
    <FormControl fullWidth>
      <InputLabel>Horarios Disponibles</InputLabel>
      <Select
        required
        value={hora}
        onChange={handleHoraChange}
        width="50px"
        label="Horarios Disponibles"
      >
        <MenuItem value="">Elija una hora, por favor</MenuItem>
        {horariosDisponibles
          && horariosDisponibles.map((horaItem) => (
            <MenuItem key={horaItem} value={horaItem}>
              {horaItem}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

const Calendario = () => (
  <div>
    <Grid container spacing={3}>
      <Grid item xs={12} md={10}>
        <Talleres />
      </Grid>
    </Grid>
  </div>
);

// Acá obtengo tipo de turno, kilometraje y patente

const TipoDeTurno = () => {
  const [kmInput, setKmInput] = React.useState('');

  const handleClick = (event) => {
    setKmInput(event.target.value);
  };

  const guardarCambio = (event) => {
    const { value } = event.target;
    turno.tipo = value;
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Tipo de turno</FormLabel>
      <Stack spacing={3} width={300}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="tipo"
          onChange={guardarCambio}
        >
          <FormControlLabel
            value="evaluacion"
            control={<Radio />}
            label="Evaluacion"
            onClick={handleClick}
          />
          <FormControlLabel
            value="service"
            control={<Radio />}
            label="Service"
            onClick={handleClick}
          />
          <br />
          {kmInput === 'service' && <Kilometraje />}
        </RadioGroup>
      </Stack>
    </FormControl>
  );
};

function isKilometroValid(kilometros) {
  return kilometros >= 5000 && kilometros <= 200000;
}

function isKmNros(km) {
  const pattern = /^\d{1,6}$/;
  return pattern.test(km);
}

const Kilometraje = () => {
  const [kilometros, setKilometros] = useState('');

  const [isKmValido, setIsKmValido] = useState(true);

  const updateNumber = (e) => {
    const val = e.target.value;

    if (e.target.validity.valid) {
      if (isKilometroValid(val)) {
        setIsKmValido(true);
      } else {
        setIsKmValido(false);
      }
      if (isKmNros(val)) {
        setKilometros(val);
      }
    } else if (val === '') {
      setKilometros(val);
    }
    if (val > 200000) {
      turno.frecuencia_km = 200000;
    } else {
      turno.frecuencia_km = Math.ceil(val / 5000) * 5000;
    }
  };

  return (
    <FormControl fullWidth>
      <FormLabel id="demo-radio-buttons-group-label">Kilometraje actual:</FormLabel>
      <TextField
        required
        type="tel"
        value={kilometros}
        pattern="[1-9][0-9]*"
        onChange={updateNumber}
      />
      {!isKmValido && (
        <Alert severity="error">Atención: el mínimo es 5000 y el máximo 200000. Cualquier valor por debajo del mínimo será tomado como 5000 y cualquiera por encima del máximo como 200000.</Alert>
      )}
    </FormControl>
  );
};

function isPatenteValida(patente) {
  const pattern = /^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$/;
  return pattern.test(patente);
}

const Patente = () => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const { value } = event.target;
    if (isPatenteValida(value)) {
      setIsValid(true);
      turno.patente = value;
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      <TextField
        required
        id="patente"
        name="patente"
        label="Patente"
        fullWidth
        variant="outlined"
        inputProps={{ minLength: 6, maxLength: 7 }}
        onChange={handleChange}
      />
      {!isValid && <Alert severity="error">Patente inválida. Ejemplos de patentes válidas: AA111AA o ABC123</Alert>}
    </>
  );
};

// eslint-disable-next-line react/function-component-definition
export default function DatosForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Patente y motivo del turno
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Patente />
        </Grid>
        <Grid item xs={12}>
          <TipoDeTurno />
        </Grid>
      </Grid>
      <Calendario />
    </>
  );
}
