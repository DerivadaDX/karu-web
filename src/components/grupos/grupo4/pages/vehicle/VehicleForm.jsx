/*eslint-disable */
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import { inputs } from '../../dto/vehicle-props';
import { GetAllModels } from '../../api/API-methods';
import '../../assets/css/formVehicle.css';
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

const VehicleForm = () => {
  const [values, setValues] = useState({
    plate: '',
    kilometers: '',
    dni: '',
    origin: '',
    gnc: false,
    modelData: {
      brand: '',
      model: '',
      year: '',
      basePrice: 0.0,
      engine: '',
      fuelType: '',
      category: '',
    },
  });

  const [models, setModels] = useState([
    { brand: '', model: '', year: '', basePrice: 0.0, engine: '', fuelType: '', category: ''},
  ]);

  const [isDropdownInitialized, setIsDropdownInitialized] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedGNC, setSelectedGNC] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const updateDropdown = async () => {
      const value = await GetAllModels();
      const modelos = value.map((model) => ({
        brand: model.brand,
        model: model.model,
        year: model.year,
        basePrice: model.basePrice,
        engine: model.engine,
        fuelType: model.fuelType,
        category: model.category
      }));
      setModels(modelos);
      setIsDropdownInitialized(true);
    };

    if (!isDropdownInitialized) {
      updateDropdown();
    }
  }, [isDropdownInitialized]);

  const { saveVehicle, showSpansaveVehicleError, saveVehicleMessageError, setSpansaveVehicleError} =
    useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveVehicle(values);
  };

  const onChange = (e) => {
    const { name } = e.target;
    const inputElement = e.target;
    const isValid = inputElement.checkValidity();
    const errorMessage = inputs.map((input) =>
      input.name === name ? input.errorMessage : ""
    )
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValid ? '' : errorMessage,
    }));
    setValues({ ...values, [e.target.name]: e.target.value });
    setSpansaveVehicleError(false);
  };

  const onChangeDropdown = (e, model) => {
    setValues({ ...values, [e.target.name]: model });
    setSelectedModel(e.target.value);
    setSpansaveVehicleError(false);
  };

  const handleOriginChange = (e) => {
    setSelectedOrigin(e.target.value);
    setValues({ ...values, origin: e.target.value });
  };

  const handleGNCChange = (e) => {
    setSelectedGNC(e.target.value);
    const isGNC = e.target.value === 'SI' ? true : false;
    setValues({ ...values, gnc: isGNC });
  };

  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack component="form" onSubmit={handleSubmit} sx={{ width: '70%', display: 'flex', textAlign: 'center' }}>
        <Typography variant="h2">Cargar datos del auto</Typography>
        {inputs.map((input) => (
          <TextField
            key={input.id}
            name={input.name}
            variant="filled"
            label={input.label}
            onChange={onChange}
            defaultValue={''}
            inputProps={{ pattern: input.pattern }}
            error={Boolean(errors[input.name])} // Show error message if exists
            helperText={errors[input.name]} // Show error message
            required
          ></TextField>
        ))}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Seleccione un modelo de auto</InputLabel>
            <Select
              name='modelData'
              value={selectedModel}
              onChange={(e) => onChangeDropdown(e, JSON.parse(e.target.value))}
            >
              {models.map((model, index) => (
                <MenuItem key={index} value={JSON.stringify(model)}>
                  {model.brand} {model.model} ({model.year}) ({model.engine})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Seleccione el origen del vehiculo</InputLabel>
            <Select value={selectedOrigin} onChange={handleOriginChange}>
              <MenuItem value="NACIONAL">NACIONAL</MenuItem>
              <MenuItem value="IMPORTADO">IMPORTADO</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>¿Posee GNC?</InputLabel>
            <Select value={selectedGNC} onChange={handleGNCChange}>
              <MenuItem value="SI">SI</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" type="submit">
          Enviar
        </Button>
        <Alert
          severity="error"
          onClose={() => {setSpansaveVehicleError(false)}}
          style={
            showSpansaveVehicleError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {saveVehicleMessageError}
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
  );
};

export default VehicleForm;
