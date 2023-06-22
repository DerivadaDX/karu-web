/*eslint-disable */
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { GetUser } from '../../api/API-methods';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formRegister.css';
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const UpdateProfile = () => {
  const {
    cookie,
    updateUser,
    updatePasswordUser,
    showSpanUpdateUserError,
    updateUserMessageError,
    showSpanUpdateUserPasswordError,
    updateUserPasswordMessageError,
    setSpanUpdateUserPasswordError,
    setSpanUpdateUserError,
  } = useContext(UserContext);
  const cookieResult = cookie.get('user');
  const [values, setValues] = useState({
    username: cookieResult.username,
    email: '',
  });

  const [valuesPassword, setValuesPassword] = useState({
    username: cookieResult.username,
    oldPassword: '',
    newPassword: '',
  });

  const [emailActual, setEmailActual] = useState('');
  const [showError, setShowError] = useState(false);
  const [showMailError, setShowMailError] = useState(false);

  const onChangeEmail = (e) => {
    const isValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
      e.target.value
    );
    setShowMailError(!isValid);
    setValues({ ...values, [e.target.name]: e.target.value });
    setSpanUpdateUserError(false);
  };

  const onChangePassword = (e) => {
    const isValid =
      /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*_?ł€¶ŧ←↓→øþ\[,.:;'¡¿~|¬-]).{8,20}$/.test(
        e.target.value
      );
    setShowError(!isValid);
    setValuesPassword({ ...valuesPassword, [e.target.name]: e.target.value });
    setSpanUpdateUserPasswordError(false);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    await updateUser(values);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    await updatePasswordUser(valuesPassword);
  };

  useEffect(() => {
    async function fetchData() {
      const value = await GetUser(cookieResult.username);
      setEmailActual(value);
    }
    fetchData();
  }, []);

  return (
    <Paper sx={{ display: 'block', margin: 'auto' }}>
      <Paper>
        <Stack
          component="form"
          onSubmit={handleSubmitEmail}
          direction="column"
          spacing={1}
          sx={{
            width: '50%',
            display: 'flex',
            textAlign: 'center',
            margin: 'auto',
            paddingBottom: '3em',
          }}
        >
          <Typography variant="h4">ACTUALIZAR EMAIL</Typography>
          <TextField type="email" label="Email" value={emailActual} readOnly />
          <TextField
            name="email"
            type="email"
            label="Email nuevo"
            placeholder="Email nuevo"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            onChange={onChangeEmail}
          />
          {showMailError && (
            <Alert severity="warning">
              ¡Ingrese un correo valido! Ejemplo: ejemplo@gmail.com
            </Alert>
          )}
          <Alert
            severity="error"
            onClose={() => {setSpanUpdateUserError(false)}}
            style={
              showSpanUpdateUserError
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {updateUserMessageError}
          </Alert>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </Stack>
      </Paper>

      <Paper>
        <Stack
          component="form"
          direction="column"
          spacing={1}
          onSubmit={handleSubmitPassword}
          sx={{
            width: '50%',
            display: 'flex',
            textAlign: 'center',
            margin: 'auto',
            paddingBottom: '3em',
          }}
        >
          <Typography variant="h4">ACTUALIZAR CONTRASEÑA</Typography>
          <TextField
            label="contraseña actual"
            name="oldPassword"
            type="password"
            placeholder="Contraseña actual"
            pattern="^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*_?ł€¶ŧ←↓→øþ\[,.:;'¡¿~|¬-]).{8,20}$"
            required
            onChange={onChangePassword}
          />
          <TextField
            label="contraseña nueva"
            name="newPassword"
            type="password"
            placeholder="Contraseña nueva"
            pattern="^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*_?ł€¶ŧ←↓→øþ\[,.:;'¡¿~|¬-]).{8,20}$"
            required
            onChange={onChangePassword}
          />
          {showError && (
            <Alert severity="warning">
              ¡La contraseña debe tener entre 8 y 20 caracteres e incluir al
              menos 1 letra, 1 número y 1 carácter especial!.
            </Alert>
          )}
          <Alert
            severity="error"
            onClose={() => {setSpanUpdateUserPasswordError(false)}}
            style={
              showSpanUpdateUserPasswordError
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {updateUserPasswordMessageError}
          </Alert>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginBottom: '2em' }}
          >
            Enviar
          </Button>
        </Stack>
        <Grid container justifyContent="center">
          <Grid item>
            <Box display="inline-block">
              <Link to={'/'}>
                <p>Volver al inicio</p>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default UpdateProfile;
