import React, { useState } from 'react';

import {
  Box,
  Paper,
} from '@mui/material';

import Encabezado from '../common/Encabezado';
import ListadoSucursales from './componentes/ListadoSucursales';
import ListadoVendedores from './componentes/ListadoVendedores';

const styles = {
  paper: {
    padding: 2,
  },
};

const Vendedores = () => {
  const [showVendedores, setShowVendedores] = useState(false);
  const [nombresucursal, setnombreSucursal] = useState('asdfsdfdsf');

  return (
    <Box>
      <Encabezado titulo="Vendedores" subtitulo="Alta, baja y modificación de Vendedores" />
      <Paper sx={styles.paper} elevation={5}>
        {!showVendedores
         && (
         <ListadoSucursales
           setnombreSucursal={setnombreSucursal}
           setShowVendedores={setShowVendedores}
         />
         )}
        <ListadoVendedores nombresucursal={nombresucursal} />
      </Paper>
    </Box>
  );
};

export default Vendedores;
