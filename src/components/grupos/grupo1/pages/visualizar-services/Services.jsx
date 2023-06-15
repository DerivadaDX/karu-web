/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { TabServices } from './TabServices';
import { UserContext } from '../../../grupo4/context/UsersContext';
import Roles from '../../../../roles';
import Alerts from '../../components/common/Alerts';

// const idSupervisor = 43;
const Services = () => {
  const [idSupervisor, setIdSupervisor] = useState('');
  const { cookie } = useContext(UserContext);
  const [rolUsuario, setRolUsuario] = useState('');

  useEffect(() => {
    const user = cookie.get('user');
    if (user) {
      setRolUsuario(user.type);
      if (user.type === Roles.SUPERVISOR_TECNICO) {
        setIdSupervisor(user.id);
      } else {
        setIdSupervisor('43');
      }
    }
  }, []);
  return (

    <>
      <Box mt="5px">
        <Box display="flex">
          <Header titulo="Services" subtitulo="Administración" />
        </Box>
      </Box>
      <Divider sx={{ color: 'silver' }} />
      <Container maxWidth="xxl" sx={{ mb: 2 }}>
        {idSupervisor && rolUsuario !== Roles.IT
          ? (
            <TabServices idSupervisor={idSupervisor} />
          ) : (
            <>
              <Alerts alertType="info" title="Atención" description="Se ingresó con Rol IT. Por default, se tomarán los datos del supervisor con id número 43." />
              { idSupervisor ? (
                <TabServices idSupervisor={idSupervisor} />
              ) : (
                <Alerts alertType="error" title="Ha ocurrido algo" description="Ocurrió un problema. Por favor, comuníquese con el área de IT de KarU." />
              )}

            </>
          )}
      </Container>
    </>
  );
};

export default Services;
