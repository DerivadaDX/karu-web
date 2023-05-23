import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SucursalService from '../services/sucursal-service';

const ID_SUCURSAL = 1;

const styles = {
  nombreSucursal: {
    fontSize: '1.5rem',
  },
  nombreCampos: {
    fontWeight: 'bold',
  },
};

const InformacionSucursal = () => {
  const [sucursal, setSucursal] = useState([]);

  useEffect(() => {
    SucursalService.obtenerSucursalPorId(ID_SUCURSAL)
      .then((response) => setSucursal(response.data));
  }, []);

  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell sx={styles.nombreSucursal}>
            {sucursal.nombre}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={styles.nombreCampos} align="right">
            Dirección:
          </TableCell>
          <TableCell>
            {sucursal.calle}
          </TableCell>
          <TableCell sx={styles.nombreCampos}>
            Altura:
          </TableCell>
          <TableCell>
            {sucursal.numero}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={styles.nombreCampos} align="right">
            Localidad:
          </TableCell>
          <TableCell>
            {sucursal.localidad}
          </TableCell>
          <TableCell sx={styles.nombreCampos}>
            Provincia:
          </TableCell>
          <TableCell>
            {sucursal.provincia}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default InformacionSucursal;
