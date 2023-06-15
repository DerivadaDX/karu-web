/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useEffect, useState } from 'react';

import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { SimpleTabTurnos } from './SimpleTab';
import { UserContext } from '../../../grupo4/context/UsersContext';
import Roles from '../../../../roles';
import Alerts from '../../components/common/Alerts';

const AgendaTaller = () => {
  // const idTaller = 'T002';
  const [idTaller, setIdTaller] = useState('');
  const { cookie } = useContext(UserContext);
  const [rolUsuario, setRolUsuario] = useState('');

  useEffect(() => {
    const user = cookie.get('user');
    if (user) {
      setRolUsuario(user.type);
      if (user.type === Roles.SUPERVISOR_TECNICO) {
        setIdTaller(user.branch);
      } else {
        setIdTaller('T002');
      }
    }
  }, []);

  return (
    <>
      <Box mt="5px">
        <Box display="flex">
          <Header titulo="Turnos" subtitulo="Agenda del taller" />
        </Box>
      </Box>
      <Divider sx={{ color: 'silver' }} />
      <Container maxWidth="xxl" sx={{ mb: 2 }}>
        {idTaller && rolUsuario !== Roles.IT ? (
          <SimpleTabTurnos idTaller={idTaller} />
        ) : (
          <>
            <Alerts alertType="info" title="Atención" description="Se ingresó con Rol IT. Por default, se mostrará con el taller id número 2. " />
            {idTaller ? (
              <SimpleTabTurnos idTaller={idTaller} />
            ) : (
              <Alerts alertType="error" title="Ha ocurrido algo" description="Ocurrió un problema. Por favor, comuníquese con el área de IT de KarU." />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default AgendaTaller;
