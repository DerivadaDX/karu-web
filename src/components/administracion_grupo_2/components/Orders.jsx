import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../common/Title';
import { useEffect } from 'react';
import { useState } from 'react';
import { getMovimientos } from '../../services';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [movimientos,setMovimientos]=useState([]);

  useEffect(()=>{
    getMovimientos().then(response=> setMovimientos(response.data,));
  },[])

  return (
    <React.Fragment>
      <Title>Ultimos Movimientos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Cuenta Origen</TableCell>
            <TableCell>Cuenta Destino</TableCell>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell>Numero de operación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {movimientos && movimientos.map((movimiento, index) => (
            <TableRow key={movimiento.numero_operacion}>
              <TableCell>{movimiento.fecha}</TableCell>
              <TableCell>{movimiento.id_cuenta_origen}</TableCell>
              <TableCell>{movimiento.id_cuenta_destino}</TableCell>
              <TableCell>{movimiento.concepto}</TableCell>
              <TableCell align="right">{`$${movimiento.monto}`}</TableCell>
              <TableCell align="center">{movimiento.numero_operacion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
