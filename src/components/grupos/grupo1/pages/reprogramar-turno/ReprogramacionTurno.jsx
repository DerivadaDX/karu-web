/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  DialogActions,
} from '@mui/material';
import { React, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { format } from 'date-fns';
import {
  DateCalendar, LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import feriados from './feriados.json';
import disponibilidad from './disponibilidad.json';
import turno from './turno.json';
import LittleHeader from '../../components/common/LittleHeader';
import Popup from '../../components/common/DialogPopup';
import Alerts from '../../components/common/Alerts';

const ReprogramacionTurno = (props) => {
  const {
    idTurnoPadre, open, setOpen, actualizar, setActualizar,
  } = props;

  const [hora, setHora] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(dayjs());

  const [openTurnoCreado, setOpenTurnoCreado] = useState(false);
  const [openConfirmarTurno, setOpenConfirmarTurno] = useState(false);

  // Alerta de la api post
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertmensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  // Se guarda en el json el id del turno "viejo"
  turno.id_turno = idTurnoPadre;

  // Fecha de Buenos Aires
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale('es');

  dayjs.tz.setDefault('America/Argentina/Buenos_Aires');

  const diaActual = dayjs();

  const crearTurno = (idTurno) => {
    setOpenConfirmarTurno(true);
  };

  const handleSubmit = () => {
  };

  const handleChangeHour = (event) => {
    const selectedValue = event.target.value;
    setHora(selectedValue);
    turno.hora_inicio = `${parseInt(selectedValue, 10)}:00:00`;
    console.log(selectedValue);
  };

  const handleChangeDate = (date) => {
    setFechaSeleccionada(date);
    turno.fecha_inicio = format(new Date(date), 'yyyy-MM-dd');
    console.log(turno.fecha_inicio);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        width: '22rem',
      }}
      >
        <Box sx={{ mt: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={diaActual}
              value={fechaSeleccionada}
              onChange={handleChangeDate}
              disablePast
            />
          </LocalizationProvider>

          <InputLabel htmlFor="horarios" aria-describedby="helper-horarios">Horarios disponibles*</InputLabel>
          <Select
            required
            value={hora}
            onChange={handleChangeHour}
            color="secondary"
            fullWidth
          >
            <MenuItem value="">Elija una hora, por favor.</MenuItem>
            {/* {horarios.hora
          && horarios.hora.map((horaItem) => (
            <MenuItem key={horaItem} value={horaItem}>
              {horaItem}
            </MenuItem>
          ))} */}
            <MenuItem value="9">9:00</MenuItem>
          </Select>

          {/* Botones que estan en la base del popup */}
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              color="secondary"
              onClick={() => {
                crearTurno();
              }}
            >
              Crear turno
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              style={{ backgroundColor: 'rgb(128, 19, 19)' }}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>

        {/* Pop up para confirmar el turno */}
        <Popup
          title={<LittleHeader titulo="Crear turno" />}
          openDialog={openConfirmarTurno}
          setOpenDialog={setOpenConfirmarTurno}
          description="¿Está seguro que desea crear el turno? No se podrá modificar una vez creado."
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Alerts alertType={alertError} description={alertMensaje} title={alertTitulo} />
          </Box>
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Enviar
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  setOpenConfirmarTurno(false);
                }}
              >
                Cerrar
              </Button>
            </DialogActions>
          </Box>
        </Popup>

        {/* Popup confirmando que se creo el turno */}
        <Popup
          title={<LittleHeader titulo="Turno cargado exitosamente." />}
          openDialog={openTurnoCreado}
          setOpenDialog={setOpenTurnoCreado}
          description="El turno creado se ha enviado existosamente."
        >
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Aceptar
              </Button>
            </DialogActions>
          </Box>
        </Popup>
      </Box>
    </Box>
  );
};

export default ReprogramacionTurno;
