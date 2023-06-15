/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';

import { Box, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { UserContext } from '../../../grupo4/context/UsersContext';
import Roles from '../../../../roles';
import VisualizacionBusquedaTecnicos from './VisualizacionFiltroBusqueda';
import Alerts from '../../components/common/Alerts';

const VisualizacionTecnicos = () => {
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
          <Header titulo="Datos de técnicos" subtitulo="En esta sección, tendrás la posibilidad de acceder a una visualización detallada de la información sobre cada técnico, así como los trabajos que han realizado. Además, podrás realizar búsquedas para encontrar la información específica del técnico que deseas consultar." />
        </Box>
      </Box>
      <Divider sx={{ color: 'silver' }} />
      {idTaller && rolUsuario !== Roles.IT ? (
        <VisualizacionBusquedaTecnicos taller={idTaller} />
      ) : (
        <>
          <Alerts alertType="info" title="Atención" description="Se ingresó con Rol IT. Por default, se mostrará con el taller id número 2." />
          { idTaller ? (
            <VisualizacionBusquedaTecnicos taller={idTaller} />
          ) : (
            <Alerts alertType="error" title="Ha ocurrido algo" description="Ocurrió un problema. Por favor, comuníquese con el área de IT de KarU." />
          )}
        </>
      )}
    </>
  );
};

export default VisualizacionTecnicos;
