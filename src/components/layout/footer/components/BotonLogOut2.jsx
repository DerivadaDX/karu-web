import React, { useContext } from 'react';

import Typography from '@mui/material/Typography';

import { UserContext } from '../../../grupos/grupo4/context/UsersContext';

const BotonLogOut = () => {
  const { cookie, logOut } = useContext(UserContext);
  const informacionUsuario = cookie.get('user');

  const textoCerrarSesion = `Cerrar sesión (${informacionUsuario?.username})`;

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      onClick={logOut}
      sx={{
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      {textoCerrarSesion}
    </Typography>
  );
};

export default BotonLogOut;
