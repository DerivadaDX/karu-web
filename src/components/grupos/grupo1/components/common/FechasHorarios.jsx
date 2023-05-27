/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Grid, FormControl, Select, InputLabel, MenuItem,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format } from 'date-fns';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import axios from 'axios';
import feriados from '../../pages/turnos/turno-cliente/feriados.json';
import disponibilidad from '../../pages/turnos/turno-cliente/disponibilidad.json';
import turno from '../../pages/turnos/turno.json';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es');
dayjs.tz.setDefault('America/Argentina/Buenos_Aires');

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const limite = dayjs().add(31, 'day');

// Para traer la disponibilidad de un taller

const fetchAgendaData = async (idTaller) => {
  const agendaEndPoint = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles/${idTaller}/`;

  try {
    const response = await axios.get(agendaEndPoint);
    // eslint-disable-next-line no-import-assign
    disponibilidad = response.data;
  } catch (error) {
    // console.error(error);
  }
};

const isFeriadoIsMas30Dias = (date) => {
  const actual = format(new Date(date), 'dd/MM/yyyy');
  const hoy = format(new Date(today), 'dd/MM/yyyy');
  let isFeriado = false;

  // eslint-disable-next-line no-restricted-syntax
  for (const dia in feriados) { if (actual === feriados[dia]) { isFeriado = true; } }
  return isFeriado || date > limite || actual === hoy;
};

const Disponibilidad = ({ tallerId }) => {
  const [dia, setDia] = React.useState(tomorrow);

  fetchAgendaData(tallerId);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          marginTop: 2,
          marginBottom: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MobileDatePicker
          margin="normal"
          fullWidth
          required
          label="Fecha"
          format="DD/MM/YYYY"
          defaultValue={tomorrow}
          disablePast
          shouldDisableDate={isFeriadoIsMas30Dias}
          views={['year', 'month', 'day']}
          value={dia}
          onChange={(newValue) => {
            setDia(newValue);
            turno.fecha_inicio = format(new Date(newValue), 'yyyy-MM-dd');
            turno.fecha_fin = format(new Date(newValue), 'yyyy-MM-dd');
          }}
        />
        <Grid item xs={12} md={10}>
          {turno.fecha_inicio !== ''
            && (
              <Box
                sx={{
                  marginTop: 3,
                  marginBottom: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Hora
                  required
                  fecha={turno.fecha_inicio}
                  diasYhorarios={disponibilidad.dias_y_horarios}
                />
              </Box>
            )}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

const Hora = ({ diasYhorarios, fecha }) => {
  const [hora, setHora] = React.useState('');
  let h;

  const handleHoraChange = (event) => {
    const selectedValue = event.target.value;
    setHora(selectedValue);
    turno.hora_inicio = `${parseInt(selectedValue, 10)}:00:00`;
    h = parseInt(selectedValue, 10) + 1;
    turno.hora_fin = `${h}:00:00`;
  };

  const horariosDisponibles = diasYhorarios
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

export default Disponibilidad;
