import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Typography,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';

import ComisionService from '../services/comision-service';
import PopUpModificarComision from './PopUpModificarComision';
import PopUpCrearComision from './PopUpCrearComision';

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

  const actualizarDatosDeComision = (comisionModificada) => {
    const actualizarComisionModificada = (comisionActual) => {
      const esLaComisionModificada = comisionActual.id === comisionModificada.id;
      const comision = esLaComisionModificada ? comisionModificada : comisionActual;

      return comision;
    };

    setComisiones((comisionesActuales) => comisionesActuales.map(actualizarComisionModificada));
  };

  const renderFormatoPorcentaje = ({ row }) => {
    const valorDeComision = row.original.valor;
    const porcentaje = `${valorDeComision} %`;

    return porcentaje;
  };

  const renderCategoria = ({ row }) => {
    const idCategoria = row.original.categoria_id;

    switch (idCategoria) {
      case 1:
        return 'Gama baja';
      case 2:
        return 'Gama media';
      case 3:
        return 'Gama alta';
      default:
        return '-';
    }
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

  const renderCrearComision = () => (
    <PopUpCrearComision
      onCreate={obtenerComisiones}
    />
  );

  const renderAccionesFila = ({ row }) => {
    const comision = row.original;

    return (
      <PopUpModificarComision
        comision={comision}
        onEdit={actualizarDatosDeComision}
      />
    );
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
        Cell: renderCategoria,
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
        renderTopToolbarCustomActions={renderCrearComision}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={renderAccionesFila}
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
