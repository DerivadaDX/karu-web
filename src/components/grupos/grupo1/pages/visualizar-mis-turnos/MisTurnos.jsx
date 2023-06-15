/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { TabMisTurnos } from './TabMisTurnos';
import { UserContext } from '../../../grupo4/context/UsersContext';

// const idTecnico = 46;

const MisTurnos = () => {
  const [idTecnico, setIdTaller] = useState('');
  const { cookie } = useContext(UserContext);

  useEffect(() => {
    const user = cookie.get('user');
    if (user) {
      setIdTaller(user.id);
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
        <TabMisTurnos idTecnico={idTecnico} />
      </Container>
    </>
  );
};

export default MisTurnos;
