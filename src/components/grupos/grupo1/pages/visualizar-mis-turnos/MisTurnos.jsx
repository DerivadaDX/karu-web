/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Container, Divider,
} from '@mui/material';
import Header from '../../components/common/Header';
import { TabMisTurnos } from './TabMisTurnos';
import { UserContext } from '../../../grupo4/context/UsersContext';
import Roles from '../../../../roles';
import Alerts from '../../components/common/Alerts';

// const idTecnico = 46;

const MisTurnos = () => {
  const [idTecnico, setIdTecnico] = useState('');
  const { cookie } = useContext(UserContext);
  const [rolUsuario, setRolUsuario] = useState('');

  useEffect(() => {
    const user = cookie.get('user');
    if (user) {
      setRolUsuario(user.type);
      if (user.type === Roles.TECNICO) {
        setIdTecnico(user.id);
      } else {
        setIdTecnico('46');
      }
    }
  }, []);
  return (
    <>
      <Box mt="5px">
        <Box display="flex">
          <Header titulo="Mis Turnos" subtitulo="Área de trabajo" />
        </Box>
      </Box>
      <Divider sx={{ color: 'silver' }} />
      <Container maxWidth="xxl" sx={{ mb: 2 }}>
        { idTecnico && rolUsuario !== Roles.IT ? (
          <TabMisTurnos idTecnico={idTecnico} />
        ) : (
          <>
            <Alerts alertType="info" title="Atención" description="Se ingresó con Rol IT. Por default, se mostrará información con el técnico id número 46." />
            { idTecnico ? (
              <TabMisTurnos idTecnico={idTecnico} />
            ) : (
              <Alerts alertType="error" title="Ha ocurrido algo" description="Ocurrió un problema. Por favor, comuniquese con el área de IT de KarU." />
            )}
          </>
        )}

      </Container>
    </>
  );
};

export default MisTurnos;
