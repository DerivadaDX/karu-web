import React, { useContext, useEffect, useState } from 'react';

import { Box } from '@mui/material';

import Copyright from './components/Copyright';
import BotonLogin from './components/BotonLogin';
import BotonLogout from './components/BotonLogout';
import { UserContext } from '../../grupos/grupo4/context/UsersContext';

const Footer = () => {
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    setMostrarLogin(!isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Box>
      {mostrarLogin ? <BotonLogin /> : <BotonLogout />}
      <Copyright />
    </Box>
  );
};

export default Footer;
