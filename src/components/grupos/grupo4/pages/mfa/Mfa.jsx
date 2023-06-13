/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formMfa.css';
import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const Mfa = () => {
  const {
    showSpanLoginTokenError,
    authToken,
    setTokenState,
    twoFactorCode,
    username,
    password,
    cookie,
    login,
    navigate,
    userType,
    setIsAuthenticated,
  } = useContext(UserContext);
  const [isValidToken, setIsValidToken] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (await authToken({ username, password, twoFactorCode })) {
      setIsValidToken(true);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    if (isValidToken) {
      const loggedUser = JSON.stringify({ username, password, type: userType });
      const sevenDaysInSeconds = 7 * 24 * 60 * 60;

      cookie.set('user', loggedUser, { maxAge: sevenDaysInSeconds });

      login();
      navigate('/');
    }
  }, [isValidToken]);

  return (
    <Paper
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Stack
        component="form"
        onSubmit={submitHandler}
        sx={{
          width: '50%',
          display: 'flex',
          textAlign: 'center',
          paddingBottom: '2em',
        }}
      >
        <Typography variant="h3">TOKEN</Typography>
        <TextField
          variant="filled"
          label="Ingrese el token enviado por mail"
          onChange={(e) => {
            setTokenState(e.target.value);
          }}
          required
        />
        <Button variant="contained" type="submit">
          Enviar
        </Button>
        <Alert
          severity="error"
          style={
            showSpanLoginTokenError ? { display: 'block' } : { display: 'none' }
          }
        >
          Token invalido.
        </Alert>
      </Stack>
    </Paper>
  );
};

export default Mfa;
