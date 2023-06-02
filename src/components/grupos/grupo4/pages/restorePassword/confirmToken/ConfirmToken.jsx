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
import '../../../assets/css/formConfirmToken.css';

const ConfirmToken = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const {
    navigate,
    validateTokenFormRestorePass,
    setTokenToChangePassState,
    tokenToChangePass,
    saveConfirmTokenMessageError,
    showSpanConfirmTokenError,
  } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (await validateTokenFormRestorePass(tokenToChangePass)) {
      setIsValidToken(true);
    }
  };

  useEffect(() => {
    if (isValidToken) {
      navigate('/restorePassword/changePassword');
    }
  }, [isValidToken]);

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
        <Typography variant="h4">
          Confirmar TOKEN enviado por correo.
        </Typography>
        <TextField
          label="token"
          placeholder="ingresar token"
          onChange={(e) => {
            setTokenToChangePassState(e.target.value);
          }}
          required
        />
        <Button variant="contained" type="submit" sx={{ marginBottom: '2em' }}>
          Enviar
        </Button>
        <Alert
          severity="error"
          style={
            showSpanConfirmTokenError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {saveConfirmTokenMessageError}
        </Alert>
      </Stack>
    </Paper>
  );
};

export default ConfirmToken;
