import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { FormControl, FormLabel } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Disponibilidad from '../Componentes/FechasHorarios';
import Talleres from '../Componentes/Talleres';
import ValidarPatente from '../Helpers/validar-patente';
import Alerts from '../../../components/common/Alerts';

const Formulario = () => {
  const [taller, setTaller] = useState();
  const [patente, setPatente] = useState();
  // fecha y hora para pasarlo como props y setearlo en Disponibilidad
  // así ya no uso jsons y es más reutilizable y prolijo
  // const [fecha, setFecha] = useState();
  // const [hora, setHora] = useState();
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
    console.log({
      taller,
      patente,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
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
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Turno
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Formulario;
