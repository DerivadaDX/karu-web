/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Grid, FormControl, Select, InputLabel, MenuItem,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format } from 'date-fns';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import axios from 'axios';
import feriados from '../turno-service-cliente/feriados.json';
import disponibilidad from '../turno-service-cliente/disponibilidad.json';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es');
dayjs.tz.setDefault('America/Argentina/Buenos_Aires');

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

// Para traer la disponibilidad de un taller

const fetchAgendaData = async (endPoint, msjError) => {
  try {
    const response = await axios.get(endPoint);
    // eslint-disable-next-line no-import-assign
    disponibilidad = response.data;
    msjError('');
  } catch (error) {
    msjError(error.response.data);
  }
};

const Disponibilidad = ({
  endPoint, setFecha, setHora, msjError, limite,
}) => {
  const [dia, setDia] = React.useState(tomorrow);
  const [fechaSeleccionada, setFechaSeleccionada] = React.useState('');

  const lim = dayjs().add(limite, 'day');

  fetchAgendaData(endPoint, msjError);

  const isFeriadoIsMas30Dias = (date) => {
    const actual = format(new Date(date), 'dd/MM/yyyy');
    const hoy = format(new Date(today), 'dd/MM/yyyy');
    let isFeriado = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const d in feriados) { if (actual === feriados[d]) { isFeriado = true; } }
    return isFeriado || date > lim || actual === hoy;
  };

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
        <DateCalendar
          margin="normal"
          fullwidth="true"
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
            setFecha(format(new Date(newValue), 'yyyy-MM-dd'));
            setFechaSeleccionada(format(new Date(newValue), 'yyyy-MM-dd'));
          }}
        />
        <Grid item xs={12} md={10}>
          {fechaSeleccionada
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
                  fecha={fechaSeleccionada}
                  diasYhorarios={disponibilidad.dias_y_horarios}
                  setHoraSeleccionada={setHora}
                />
              </Box>
            )}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

const Hora = ({ diasYhorarios, fecha, setHoraSeleccionada }) => {
  const [hora, setHora] = React.useState('');

  const handleHoraChange = (event) => {
    const selectedValue = event.target.value;
    setHora(selectedValue);
    setHoraSeleccionada(`${parseInt(selectedValue, 10)}:00:00`);
  };

  const horariosDisponibles = diasYhorarios
    ?.find((item) => item.dia === fecha)?.horarios_disponibles;

  return (
    <FormControl fullwidth="true">
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
