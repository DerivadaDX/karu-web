/*eslint-disable */
import React, { useContext, useState } from 'react';
import { inputs } from '../../dto/paperwork-props';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formPaperWork.css';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const defaultState = {
  plate: '',
  infractions: true,
  debt: 0,
  vpa: null,
  rva: null,
  vtv: null,
};

const PaperWork = () => {
  const [state, setState] = useState(defaultState);
  const { sendPaperWorkData, showSpanPaperWorkError, paperWorkMessageError, setSpanPaperWorkError } =
    useContext(UserContext);

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    if (event.target.name === "plate") {
      const { name } = event.target;
      const inputElement = event.target;
      const isValid = inputElement.checkValidity();
      const errorMessage = inputs.map((input) =>
        input.name === name? input.errorMessage : ""
      )
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValid ? '' : errorMessage,
      }));
    }

    const { name, value } = event.target;
    const inputValue = value === 'SI' ? true : value === 'NO' ? false : value;
    setState((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
    setSpanPaperWorkError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { plate, infractions, debt, vpa, rva, vtv } = state;
    await sendPaperWorkData({ plate, infractions, debt, vpa, rva, vtv });
  };

  return (
    <>
      <Paper
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: '70%', display: 'flex', textAlign: 'center' }}
        >
          <Typography variant="h2">DOCUMENTACION DEL VEHICULO</Typography>
          {inputs.map((input) =>
            input.type === 'select' ? (
              <Box sx={{ minWidth: 120 }} key={input.id}>
                <FormControl fullWidth>
                  <InputLabel>{input.title}</InputLabel>
                  <Select
                    onChange={handleInputChange}
                    label={input.title}
                    name={input.name}
                  >
                    <MenuItem value="">Seleccionar</MenuItem>
                    <MenuItem value={'SI'}>SI</MenuItem>
                    <MenuItem value={'NO'}>NO</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <TextField
                key={input.id}
                type={input.type}
                required={input.required}
                name={input.name}
                // value={state[input.name]?.toString() || ''}
                defaultValue={''}
                onChange={handleInputChange}
                label={input.placeholder}
                variant="filled"
                inputProps={{ pattern: input.pattern }}
                error={Boolean(errors[input.name])} // Show error message if exists
                helperText={errors[input.name]} // Show error message
              />
            )
          )}
          <Button variant="contained" type="submit">
            Enviar
          </Button>
          <Alert
            severity="error"
            onClose={() => {setSpanPaperWorkError(false)}}
            style={
              showSpanPaperWorkError
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {paperWorkMessageError}
          </Alert>
          <Grid container justifyContent="center">
            <Grid item>
              <Box display="inline-block">
                <Link className="vehicle-container__form-a" to={'/'}>
                  <p>Volver al inicio</p>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
};

export default PaperWork;
