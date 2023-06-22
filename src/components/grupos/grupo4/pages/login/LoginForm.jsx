/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import SaveIcon from '@mui/icons-material/Save';
import '../../assets/css/formLogin.css';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const LoginForm = () => {
  const [isValidUser, setIsValidUser] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    showSpanPasswordOrUser,
    username,
    password,
    setUsernameState,
    setPasswordState,
    navigate,
    authUser,
  } = useContext(UserContext);

  useEffect(() => {
    if (isValidUser) {
      navigate('/authToken');
    }
  }, [isValidUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (await authUser({ username, password })) {
      setIsValidUser(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '50%', display: 'flex', textAlign: 'center' }}
      >
        <Typography variant="h3">LOGIN</Typography>
        <TextField
          variant="filled"
          label="Usuario"
          onChange={(e) => {
            setUsernameState(e.target.value);
          }}
        />
        <TextField
          variant="filled"
          type="password"
          label="Contraseña"
          onChange={(e) => {
            setPasswordState(e.target.value);
          }}
        />
        <Alert
          severity="error"
          style={
            showSpanPasswordOrUser ? { display: 'block' } : { display: 'none' }
          }
        >
          Usuario y/o contraseña incorrecta. Por favor vuelva a intentar.
        </Alert>
        <LoadingButton
          size="small"
          onClick={handleSubmit}
          loading={loading}
          loadingIndicator="Iniciando sesión…"
          variant="contained"
        >
          <span style={{padding: '0.5em 0'}}>Iniciar sesión</span>
        </LoadingButton>
        <a href="/restorePassword" className="login-container__form-a">
          ¿Olvidaste la contraseña?
        </a>
      </Stack>
    </Paper>
  );
};

export default LoginForm;
