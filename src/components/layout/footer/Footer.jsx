import React, { useContext, useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';

import Copyright from './components/Copyright';
import BotonLogIn from './components/BotonLogIn';
import BotonLogOut from './components/BotonLogOut';
import { UserContext } from '../../grupos/grupo4/context/UsersContext';

const Footer = () => {
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    setMostrarLogin(!isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Box display="inline-block">
          {mostrarLogin ? <BotonLogIn /> : <BotonLogOut />}
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
