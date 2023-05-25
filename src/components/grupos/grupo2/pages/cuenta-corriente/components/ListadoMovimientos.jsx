import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Typography,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';

import PopUpDetalleMovimiento from './PopUpDetalleMovimiento';
import MovimientoService from '../services/movimiento-service';
import DineroHelper from '../helpers/dinero-helper';
import FechaHelper from '../helpers/fecha-helper';

const CODIGO_CUENTA = '0000000000000000000001';

const ListadoMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerMovimientos = () => {
    MovimientoService.obtenerMovimientosDeCuenta(CODIGO_CUENTA)
      .then((response) => {
        setMovimientos(response.data);
        setCargando(false);
      });
  };

  const renderFecha = ({ row }) => {
    const fechaEnFormatoISO = row.original.fecha;

    return (
      <Typography variant="body1" component="span">
        {FechaHelper.formatearComoFecha(fechaEnFormatoISO)}
      </Typography>
    );
  };

  const renderMonto = ({ row }) => {
    const { monto, tipo } = row.original;
    const movimientoEsDebito = tipo === 'D';

    return (
      <Typography
        variant="body1"
        component="span"
        sx={{ fontWeight: 'bold', align: 'right' }}
        align="right"
        color={
          (theme) => (movimientoEsDebito
            ? theme.palette.error.main
            : theme.palette.primary.main)
        }
      >
        {DineroHelper.formatearComoDinero(monto)}
      </Typography>
    );
  };

  const renderAccionesFila = ({ row }) => {
    const movimiento = row.original;

    return <PopUpDetalleMovimiento movimientoId={movimiento.id} />;
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'fecha',
        header: 'Fecha',
        Cell: renderFecha,
      },
      {
        accessorKey: 'id_cuenta_origen',
        header: 'Cuenta origen',
      },
      {
        accessorKey: 'id_cuenta_destino',
        header: 'Cuenta destino',
      },
      {
        accessorKey: 'concepto',
        header: 'Concepto',
      },
      {
        accessorKey: 'monto',
        header: 'Monto',
        Cell: renderMonto,
      },
      {
        accessorKey: 'numero_operacion',
        header: '# Operación',
      },
    ],
    [],
  );

  useEffect(obtenerMovimientos, []);

  return (
    <Box>
      <MaterialReactTable
        columns={columnas}
        data={movimientos}
        state={{ isLoading: cargando }}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={renderAccionesFila}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
      />
    </Box>
  );
};

export default ListadoMovimientos;
