import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { FormControl, FormLabel } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Disponibilidad from '../Componentes/FechasHorarios';
import Talleres from '../Componentes/Talleres';
import ValidarPatente from '../Helpers/validar-patente';
import Alerts from '../../../components/common/Alerts';
import Popup from '../../../components/common/DialogPopup';

const Formulario = () => {
  const [taller, setTaller] = useState();
  const [patente, setPatente] = useState();
  // fecha y hora para pasarlo como props y setearlo en Disponibilidad
  // así ya no uso jsons y es más reutilizable y prolijo
  // const [fecha, setFecha] = useState();
  // const [hora, setHora] = useState();
  // Para los mensajes de confirmar o avisar que complete todos los campos
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);
  // Para validar la patente
  const [isValid, setIsValid] = useState(true);

  const guardarPatente = (event) => {
    const { value } = event.target;
    if (ValidarPatente.isPatenteValida(value)) {
      setIsValid(true);
      setPatente(value);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Quedaría verificar que haya también una fecha y un horario elegidos
    if (taller && patente && isValid) {
      setOpenPopupSeleccion(true);
    } else {
      setOpenPopupNoSeleccion(true);
    }
    console.log({
      taller,
      patente,
    });
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
            Reparación para Venta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Talleres setTallerSeleccionado={setTaller} />
            {taller && <Disponibilidad tallerId={taller} />}
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
            title="Error en Asignación"
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
            title="Asignación completada"
            description="Se ha creado el turno con éxito."
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

export default Formulario;
