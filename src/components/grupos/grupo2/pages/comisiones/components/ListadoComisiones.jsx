import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Typography,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';

import ComisionService from '../services/comision-service';

const ListadoComisiones = () => {
  const [comisiones, setComisiones] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerComisiones = () => {
    ComisionService.obtenerComisiones()
      .then((response) => {
        setComisiones(response.data);
        setCargando(false);
      });
  };

  const renderEstadoComision = ({ row }) => {
    const comisionActiva = row.original.activa;

    return (
      <Typography
        variant="body1"
        component="span"
        sx={{ fontWeight: 'bold' }}
        color={(theme) => (comisionActiva ? theme.palette.success.main : theme.palette.error.main)}
      >
        {comisionActiva ? 'Hab.' : 'Deshab.'}
      </Typography>
    );
  };

  const renderFormatoPorcentaje = ({ row }) => {
    const valorDeComision = row.original.valor;
    const numero = parseFloat(valorDeComision);
    const porcentaje = numero.toLocaleString(undefined, { style: 'percent' });

    return porcentaje;
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'valor',
        header: 'Valor',
        Cell: renderFormatoPorcentaje,
      },
      {
        accessorKey: 'categoria_id',
        header: 'Categoría',
      },
      {
        accessorKey: 'activa',
        header: 'Estado',
        Cell: renderEstadoComision,
      },
    ],
    [],
  );

  useEffect(obtenerComisiones, []);

  return (
    <Box>
      <MaterialReactTable
        columns={columnas}
        data={comisiones}
        state={{ isLoading: cargando }}
        enableRowActions
        positionActionsColumn="last"
        defaultColumn={{ minSize: 10, maxSize: 130 }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
        initialState={{
          sorting: [
            {
              id: 'id',
              desc: false,
            },
          ],
        }}
      />
    </Box>
  );
};

export default ListadoComisiones;
