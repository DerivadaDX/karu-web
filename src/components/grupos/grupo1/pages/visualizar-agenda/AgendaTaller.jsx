/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useEffect, useState } from 'react';

import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { SimpleTabTurnos } from './SimpleTab';
/* import { UserContext } from '../../../grupo4/context/UsersContext';
import Roles from '../../../../roles'; */

const AgendaTaller = () => {
  const idTaller = 'T002';
  /* const [idTaller, setIdTaller] = useState('');
  const { cookie } = useContext(UserContext);

  useEffect(() => {
    const userBranch = cookie.get('branch');
    setIdTaller(userBranch);
  }, []); */
  return (
    <>
      <Box mt="5px">
        <Box display="flex">
          <Header titulo="Turnos" subtitulo="Agenda del taller" />
        </Box>
      </Box>
      <Divider sx={{ color: 'silver' }} />
      <Container maxWidth="xxl" sx={{ mb: 2 }}>
        <SimpleTabTurnos idTaller={idTaller} />
      </Container>
    </>
  );
};

export default AgendaTaller;
