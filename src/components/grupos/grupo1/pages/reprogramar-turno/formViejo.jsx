/* eslint-disable no-unused-vars */
import {
  Box,
  FormHelperText,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Typography,
  Button,
  RadioGroup,
  Radio,
  Stack,
  FormControlLabel,
} from '@mui/material';
import { React, useState } from 'react';
import turno from './turno.json';

const formViejo = () => {
  const [valoresTurno, setValoresTurnos] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValoresTurnos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeRadio = (event) => {
    const { value } = event.target;
    turno.tipo = value;
  };

  const handleSubmit = () => {
  };

  return (
    <Box sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Typography component="h1" variant="h5">Reprogramar turno</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <InputLabel htmlFor="patente" sx={{ mt: 2 }}>Patente *</InputLabel>
        <Input
          id="patente"
          aria-describedby="helper-patente"
          placeholder="AA123AA o ABC123"
          margin="normal"
          required
          fullWidth
          autoFocus
        />
        <FormHelperText id="helper-patente">Debe colocar la patente del auto</FormHelperText>

        <InputLabel htmlFor="tipo-turno" aria-describedby="helper-tipo-turno" sx={{ mt: 2 }}>Tipo de turno *</InputLabel>
        <Stack spacing={3} width={300}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="tipo"
            onChange={handleChangeRadio}
            sx={{
              '& .MuiRadio-root.Mui-checked': {
                color: '#ef6c00',
              },
            }}
          >
            <FormControlLabel
              value="evaluacion"
              control={<Radio />}
              label="Evaluación"
            />
            <FormControlLabel
              value="service"
              control={<Radio />}
              label="Service"
            />
          </RadioGroup>
        </Stack>
        <FormHelperText id="helper-tipo-patente">Debe seleccionar algún tipo de turno</FormHelperText>

        <InputLabel htmlFor="horarios" aria-describedby="helper-horarios" sx={{ mt: 2 }}>Horarios *</InputLabel>
        <Select
          value="evaluacion"
          onChange={handleChange}
          sx={{ height: 30 }}
          name="turno"
          color="secondary"
          margin="normal"
          required
          fullWidth
        >
          <MenuItem value="9am">9:00</MenuItem>
          <MenuItem value="10am">10:00</MenuItem>
          <MenuItem value="11am">11:00</MenuItem>
        </Select>
        <FormHelperText id="helper-horarios">Debe seleccionar algún horario disponible</FormHelperText>

        <Box sx={{ mt: 2, fontSize: '0.8rem', color: 'grey' }}>
          <Typography variant="p">* todos los campos son obligatorios</Typography>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
        >
          Crear turno
        </Button>
      </Box>
    </Box>
  );
};

export default formViejo;
