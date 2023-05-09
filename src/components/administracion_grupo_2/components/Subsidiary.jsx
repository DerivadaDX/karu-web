import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Title from '../../common/Title';
import { useEffect } from 'react';
import { useState } from 'react';
import { getSubsidiary } from '../../services';

const ID_SUCURSAL = 1;

const Subsidiary = () => {
  const [subsidiary, setSubsidiary] = useState([]);

  useEffect(() => {
    getSubsidiary(ID_SUCURSAL).then(response => setSubsidiary(response.data,));
  }, [])

  return (
    <React.Fragment>
      <Title>Sucursal info</Title>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell style={{ fontSize: "1.5rem" }}>{subsidiary.nombre}</TableCell>
          </TableRow>
          <TableRow></TableRow>
          <TableRow>
            <TableCell align="right">Direccion:</TableCell>
            <TableCell>{subsidiary.calle}</TableCell>
            <TableCell>Altura:</TableCell>
            <TableCell>{subsidiary.numero}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Localidad:</TableCell>
            <TableCell>{subsidiary.localidad}</TableCell>
            <TableCell>Provincia:</TableCell>
            <TableCell>{subsidiary.provincia}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Subsidiary;
