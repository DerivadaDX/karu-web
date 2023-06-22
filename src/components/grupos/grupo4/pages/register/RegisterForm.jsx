/*eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { inputs } from '../../dto/registration-props';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formRegister.css';
import { GetAllOffices, GetAllWorkshops } from '../../api/API-methods';
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
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [values, setValues] = useState({
    username: '',
    fullName: '',
    document: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    street: '',
    streetNumber: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    type: '',
    branch: '',
    technicalLevel: '',
  });

  const [showWorkshopDropdown, setShowWorkshopDropdown] = useState(false);
  const [showTechnicalLevel, setShowTechnicalLevel] = useState(false);
  const [showOfficeDropdown, setShowOfficeDropdown] = useState(false);

  const [errors, setErrors] = useState({});

  const [isOfficeDropdownInitialized, setIsOfficeDropdownInitialized] =
    useState(false);
  const [isWorkshopDropdownInitialized, setIsWorkshopDropdownInitialized] =
    useState(false);

  const [offices, setOffices] = useState([{ officeCode: '', officeName: '' }]);
  const [workshops, setWorkshops] = useState([
    { workshopCode: '', workshopName: '' },
  ]);

  const {
    saveUser,
    showSpanAlreadyExistsUser,
    setSpanAlreadyExistsUser,
    userValueError,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveUser(values);
  };

  const onChange = (e) => {
    if (e.target.name !== "type" && e.target.name !== "branch" && e.target.name !== "technicalLevel") {
      const { name } = e.target;
      const inputElement = e.target;
      const isValid = inputElement.checkValidity();
      const errorMessage = inputs.map((input) =>
        input.name === name? input.errorMessage : ""
      )
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValid ? '' : errorMessage,
      }));
    }

    setValues({ ...values, [e.target.name]: e.target.value });
    setSpanAlreadyExistsUser(false);
  };

  useEffect(() => {
    const updateOfficeDropdown = async () => {
      const valueOffice = await GetAllOffices();
      const offices = valueOffice.map((office) => ({
        officeCode: office.officeCode,
        officeName: office.officeName,
      }));
      setOffices(offices);
      setIsOfficeDropdownInitialized(true);
    };
    const updateWorkshopDropdown = async () => {
      const valueWorkshop = await GetAllWorkshops();
      const workshops = valueWorkshop.map((workshop) => ({
        workshopCode: workshop.workshopCode,
        workshopName: workshop.workshopName,
      }));

      setWorkshops(workshops);
      setIsWorkshopDropdownInitialized(true);
    };

    if (!isOfficeDropdownInitialized) {
      updateOfficeDropdown();
    }
    if (!isWorkshopDropdownInitialized) {
      updateWorkshopDropdown();
    }
    if (values.type === 'TECNICO' || values.type === 'SUPERVISOR_TECNICO') {
      setShowWorkshopDropdown(true);
    } else {
      setShowWorkshopDropdown(false);
    }

    if (values.type === 'TECNICO') {
      setShowTechnicalLevel(true);
    } else {
      setShowTechnicalLevel(false);
    }

    if (
      values.type === 'GERENTE_SUCURSAL' ||
      values.type === 'SUPERVISOR_VENTAS' ||
      values.type === 'ADMINISTRADOR' ||
      values.type === 'VENDEDOR'
    ) {
      setShowOfficeDropdown(true);
    } else {
      setShowOfficeDropdown(false);
    }
  }, [values.type]);

  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack component="form" onSubmit={handleSubmit} sx={{ width: '70%', display: 'flex', textAlign: 'center' }}>
        <Typography variant="h2">REGISTRO</Typography>
        {inputs.map((input) => (
          <TextField
          type={input.type}
            key={input.id}
            variant="filled"
            label={input.label}
            onChange={onChange}
            name={input.name}
            inputProps={{ pattern: input.pattern }}
            error={Boolean(errors[input.name])} // Show error message if exists
            helperText={errors[input.name]} // Show error message
            required
          ></TextField>
        ))}
        <Paper>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Elija un tipo de usuario</InputLabel>
              <Select onChange={onChange} defaultValue='' name='type'>
                <MenuItem value="GERENTE_GENERAL">Gerente general</MenuItem>
                <MenuItem value="GERENTE_SUCURSAL">Gerente sucursal</MenuItem>
                <MenuItem value="SUPERVISOR_VENTAS">
                  Supervisor de ventas
                </MenuItem>
                <MenuItem value="SUPERVISOR_TECNICO">
                  Supervisor tecnico
                </MenuItem>
                <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="TECNICO">Tecnico</MenuItem>
                <MenuItem value="VENDEDOR">Vendedor</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
        {showOfficeDropdown && (
          <Paper>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Seleccione una Sucursal</InputLabel>
                <Select onChange={onChange} defaultValue="" name="branch">
                  {offices.map((office, index) => (
                    <MenuItem key={index} value={office.officeCode}>
                      {office.officeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>
        )}
        {showWorkshopDropdown && (
          <Paper>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Seleccione un Taller</InputLabel>
                <Select onChange={onChange} defaultValue="" name='branch'>
                  {workshops.map((workshop, index) => (
                    <MenuItem key={index} value={workshop.workshopCode}>
                      {workshop.workshopName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>
        )}
        {showTechnicalLevel && (
          <Paper className="inputs">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Seleccione el nivel tecnico</InputLabel>
                <Select onChange={onChange} defaultValue="" name='technicalLevel'>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        )}
        <Button variant="contained" type="submit" sx={{ marginBottom: '2em' }}>
          Enviar
        </Button>
        <Paper>
          <Alert
            severity="error"
            onClose={() => {setSpanAlreadyExistsUser(false)}}
            style={
              showSpanAlreadyExistsUser
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {userValueError}
          </Alert>
        </Paper>
        <Grid container justifyContent="center">
          <Grid item>
            <Box display="inline-block">
              <Link to={'/'}>
                <p>Volver al inicio</p>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default RegisterForm;
