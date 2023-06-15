/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { UserContext } from '../../../grupo4/context/UsersContext';
import Roles from '../../../../roles';
import Alerts from '../../components/common/Alerts';
import GridReportes from './GridReportes';

// const idTaller = 'T002';

const Reportes = () => {
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
      <Box m="2px">
        <Box display="flex">
          <Header titulo="Reportes" subtitulo="Visualización del estado de turnos y el uso del taller" />
        </Box>
        <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)' }} />
      </Box>
      { idTaller && rolUsuario !== Roles.IT ? (
        <GridReportes idTaller={idTaller} />
      ) : (
        <>
          <Alerts
            alertType="info"
            title="Atención"
            description="Se ingresó con Rol IT. Por default, se mostrará información con el taller número 2."
          />
          { idTaller ? (
            <GridReportes idTaller={idTaller} />
          ) : (
            <Alerts alertType="error" title="Ha ocurrido algo." description="Ocurrió un problema. Por favor, comuníquese con el área de IT de KarU." />
          )}
        </>
      )}
    </>
  );
};

export default Reportes;
