/*eslint-disable */
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
  } = useContext(UserContext);
  const [isValidToken, setIsValidToken] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (await authToken({ username, password, twoFactorCode })) {
      setIsValidToken(true);
    }
  };

  useEffect(() => {
    if (isValidToken) {
      const Loggeduser = JSON.stringify({ username, password, type: userType });
      cookie.set('user', Loggeduser, { maxAge: 300 });
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
