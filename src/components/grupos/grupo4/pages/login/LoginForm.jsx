/*eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
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

const LoginForm = () => {
  const [isValidUser, setIsValidUser] = useState(false);

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
    if (await authUser({ username, password })) {
      setIsValidUser(true);
    }
  };

  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Stack component="form" onSubmit={handleSubmit} sx={{width: '50%', display: 'flex', textAlign: 'center'}}>
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
        <Button variant="contained" type="submit">
          Iniciar sesión
        </Button>
        <a href="/restorePassword" className="login-container__form-a">
          ¿Olvidaste la contraseña?
        </a>
      </Stack>
    </Paper>
  );
};

export default LoginForm;
