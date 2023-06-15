/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { React, useState } from 'react';
import axios from 'axios';
import LittleHeader from '../../components/common/LittleHeader';
import Popup from '../../components/common/DialogPopup';
import Alerts from '../../components/common/Alerts';
import Disponibilidad from '../turnos/Componentes/FechasHorarios';

const ReprogramacionTurno = (props) => {
  const {
    idTurnoPadre, open, setOpen, actualizar, setActualizar,
  } = props;
  const idTaller = '2';
  const [hora, setHora] = useState();
  const [fecha, setFecha] = useState();

  const [openTurnoCreado, setOpenTurnoCreado] = useState(false);
  const [openConfirmarTurno, setOpenConfirmarTurno] = useState(false);
  const [openNoSeleccion, setOpenNoSeleccion] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const urlHorarios = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles-turno/${idTaller}/${idTurnoPadre}/`;
  const urlReprogramar = 'https://autotech2.onrender.com/turnos/reprogramar-turno/';

  // Alerta de la api post
  const [alertError, setAlertError] = useState('');
  const [alertMensaje, setAlertMensaje] = useState('');
  const [alertTitulo, setAlertTitulo] = useState('');

  const [errorMsj, setErrorMsj] = useState('');

  const handleCrearTurno = () => {
    axios.post(urlReprogramar, {
      id_turno: idTurnoPadre,
      fecha_inicio: fecha,
      hora_inicio: hora,
    })
      .then((response) => {
        setOpenTurnoCreado(true);
      })
      .catch((error) => {
        setOpenConfirmarTurno(false);
        setOpenError(true);
        setAlertError('error');
        setAlertTitulo('Ha ocurrido un problema');
        setAlertMensaje(error.response.data);
        setLoadingButton(false);
      });
  };

  const isDateSelected = () => {
    if (fecha && (hora && hora !== 'NaN:00:00')) {
      setOpenConfirmarTurno(true);
    } else {
      setOpenNoSeleccion(true);
    }
  };

  async function handleSubmit() {
    handleCrearTurno();
  }

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
          <Disponibilidad
            endPoint={urlHorarios}
            setFecha={setFecha}
            setHora={setHora}
            msjError={setErrorMsj}
            limite={45}
          />

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
                isDateSelected();
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

        {/* Popup para mostrar en caso de que no haya seleccionado hora o fecha */}
        <Popup
          title={<LittleHeader titulo="Selección de horario incompleta" />}
          openDialog={openNoSeleccion}
          setOpenDialog={setOpenNoSeleccion}
          description="Debe seleccionar un día y/o algún horario, por favor."
          disableBackdropClick
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
                  setOpenNoSeleccion(false);
                }}
              >
                Aceptar
              </Button>
            </DialogActions>
          </Box>
        </Popup>

        {/* Pop up para confirmar el turno */}
        <Popup
          title={<LittleHeader titulo="Crear turno" />}
          openDialog={openConfirmarTurno}
          setOpenDialog={setOpenConfirmarTurno}
          description="¿Está seguro que desea crear el turno? No se podrá modificar una vez creado."
          disableBackdropClick
        >
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <DialogActions>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                  color="secondary"
                  variant="outlined"
                  disabled={loadingButton}
                  onClick={() => {
                    handleSubmit();
                    setLoadingButton(true);
                  }}
                >
                  Enviar
                </Button>
                {loadingButton && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
                )}
              </Box>
              <Button
                color="error"
                variant="outlined"
                disabled={loadingButton}
                onClick={() => {
                  setOpenConfirmarTurno(false);
                }}
              >
                Cerrar
              </Button>
            </DialogActions>
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

        {/* Popup confirmando que se creo el turno */}
        <Popup
          title={<LittleHeader titulo="Turno cargado exitosamente." />}
          openDialog={openTurnoCreado}
          setOpenDialog={setOpenTurnoCreado}
          description="El turno creado se ha enviado existosamente."
          disableBackdropClick
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
