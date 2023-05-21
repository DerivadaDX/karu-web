import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import PopUpDetalleMovimiento from './PopUpDetalleMovimiento';
import DineroHelper from '../helpers/dinero-helper';
import MovimientoService from '../services/movimiento-service';
import FechaHelper from '../helpers/fecha-helper';

const CODIGO_CUENTA = '0000000000000000000001';

const Orders = () => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    MovimientoService.obtenerMovimientosDeCuenta(CODIGO_CUENTA)
      .then((response) => setMovimientos(response.data));
  }, []);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Fecha</TableCell>
          <TableCell>Cuenta Origen</TableCell>
          <TableCell>Cuenta Destino</TableCell>
          <TableCell>Concepto</TableCell>
          <TableCell align="right">Monto</TableCell>
          <TableCell>Numero de operación</TableCell>
          <TableCell>Detalle</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {movimientos && movimientos.map((movimiento) => (
          <TableRow key={movimiento.numero_operacion}>
            <TableCell>{FechaHelper.formatearComoFecha(movimiento.fecha)}</TableCell>
            <TableCell>{movimiento.id_cuenta_origen}</TableCell>
            <TableCell>{movimiento.id_cuenta_destino}</TableCell>
            <TableCell>{movimiento.concepto}</TableCell>
            <TableCell
              align="right"
              sx={{
                color: movimiento.id_cuenta_destino === CODIGO_CUENTA ? 'black' : 'red',
                fontWeight: 'bold',
              }}
            >
              {DineroHelper.formatearComoDinero(movimiento.monto)}
            </TableCell>
            <TableCell align="center">{movimiento.numero_operacion}</TableCell>
            <TableCell><PopUpDetalleMovimiento movimientoId={movimiento.id} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Orders;
