/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';

import { Box, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { UserContext } from '../../../grupo4/context/UsersContext';
import Roles from '../../../../roles';
import VisualizacionBusquedaTecnicos from './VisualizacionFiltroBusqueda';

const VisualizacionTecnicos = () => {
  const [idTaller, setIdTaller] = useState('');
  const { cookie } = useContext(UserContext);
  const [rolUsuario, setRolUsuario] = useState('');

  useEffect(() => {
    const user = cookie.get('user');
    if (user) {
      setIdTaller(user.branch);
      setRolUsuario(user.type);
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
      {idTaller ? (
        <VisualizacionBusquedaTecnicos taller={idTaller} />
      ) : (
        <p>Se ingresó con rol de IT</p>
      )}
    </>
  );
};

export default VisualizacionTecnicos;
