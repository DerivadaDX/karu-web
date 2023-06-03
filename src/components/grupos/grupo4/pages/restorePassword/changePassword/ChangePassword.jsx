import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { UserContext } from '../../../context/UsersContext';
import '../../../assets/css/formChangePassword.css';

const ChangePassword = () => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const {
    navigate,
    setNewPasswordState,
    newPassword,
    changePassword,
    emailToChangePass,
    showSpanChangePasswordError,
    changePasswordMessageError,
  } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: emailToChangePass,
      password: newPassword,
    };
    if (await changePassword(userData)) {
      setIsValidPassword(true);
    }
  };

  useEffect(() => {
    if (isValidPassword) {
      navigate('/login');
    }
  }, [isValidPassword]);

  return (
    <Paper
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Stack
        sx={{ width: '70%', display: 'flex', textAlign: 'center' }}
        onSubmit={submitHandler}
        component="form"
        autoComplete="off"
      >
        <Typography variant="h4">Escriba su nueva contraseña.</Typography>
        <TextField
          type="password"
          placeholder="Ingrese la nueva contraseña"
          label="Nueva contraseña"
          onChange={(e) => {
            setNewPasswordState(e.target.value);
          }}
          required
        />
        <Button variant="contained" type="submit" sx={{ marginBottom: '2em' }}>
          Enviar
        </Button>
        <Alert
          severity="error"
          style={
            showSpanChangePasswordError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {changePasswordMessageError}
        </Alert>
      </Stack>
    </Paper>
  );
};

export default ChangePassword;
