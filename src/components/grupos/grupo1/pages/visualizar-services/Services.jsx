/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { TabServices } from './TabServices';
import { UserContext } from '../../../grupo4/context/UsersContext';

// const idSupervisor = 43;
const Services = () => {
  const [idSupervisor, setIdSupervisor] = useState('');
  const { cookie } = useContext(UserContext);

  useEffect(() => {
    const user = cookie.get('user');
    if (user) {
      setIdSupervisor(user.id);
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
        <TabServices idSupervisor={idSupervisor} />
      </Container>
    </>
  );
};

export default Services;
