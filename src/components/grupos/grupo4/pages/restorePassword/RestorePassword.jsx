import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formRestorePass.css';

const RestorePassword = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const {
    navigate,
    emailToChangePass,
    setEmailToChangePassState,
    validateEmailRestorePassForm,
    saveConfirmEmailMessageError,
    showSpanConfirmEmailError,
  } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (await validateEmailRestorePassForm(emailToChangePass)) {
      setIsValidEmail(true);
    }
  };

  useEffect(() => {
    if (isValidEmail) {
      navigate('/restorePassword/confirmToken');
    }
  }, [isValidEmail]);

  return (
    <Paper
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Stack
        component="form"
        onSubmit={submitHandler}
        autoComplete="off"
        sx={{ width: '70%', display: 'flex', textAlign: 'center' }}
      >
        <Typography variant="h2">Ingresar Correo Electrónico</Typography>
        <TextField
          placeholder="example@gmail.com"
          label="Correo Electronico"
          name="name"
          variant="filled"
          defaultValue=""
          onChange={(e) => {
            setEmailToChangePassState(e.target.value);
          }}
          required
        />
        <Button variant="contained" type="submit" sx={{ marginBottom: '2em' }}>
          Enviar
        </Button>
        <Alert
          severity="error"
          style={
            showSpanConfirmEmailError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {saveConfirmEmailMessageError}
        </Alert>
        <Link to="/login">
          <p>Volver al Login</p>
        </Link>
      </Stack>
    </Paper>
  );
};

export default RestorePassword;
