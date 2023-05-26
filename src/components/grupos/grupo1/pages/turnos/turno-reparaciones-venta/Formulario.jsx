import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { FormControl, FormLabel } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Disponibilidad from '../../../components/common/FechasHorarios';
import Talleres from '../../../components/common/Talleres';

const Formulario = () => {
  const [taller, setTaller] = useState();
  // fecah y hora para pasarlo como props y setearlo en Disponibilidad
  // así ya no uso jsons y es más reutilizable y prolijo
  // const [fecha, setFecha] = useState();
  // const [hora, setHora] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      patente: data.get('patente'),
      taller: data.get('taller'),
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
          Turno de Reparación para Venta
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            name="taller"
            label="Talleres"
            id="taller"
            onChange={(event) => {
              setTaller(event.target.value);
            }}
          />
          {taller && <Disponibilidad tallerId={taller} />}
          <Talleres />
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
