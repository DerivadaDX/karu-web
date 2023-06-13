import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import ClienteService from '../services/ClienteService';

const styles = {
  paper: {
    padding: 2,
  },
};

styles.paperInferior = {
  ...styles.paper,
  overflow: 'auto',
  maxHeight: '60vh',
};

const ListadoClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerClientes = () => {
    ClienteService.obtenerClientes()
      .then((response) => {
        setClientes(response.data);
        setCargando(false);
      });
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'dni',
        header: 'DNI',
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'apellido',
        header: 'Apellido',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'direccion',
        header: 'Direccion',
      },
      {
        accessorKey: 'numTelefono',
        header: 'Telefono',
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha',
      },
    ],
    [],
  );

  useEffect(obtenerClientes, []);

  return (
    <Box style={{ overflowX: 'auto' }}>
      <h1 id="titulo-tabla">Listado de clientes</h1>
      <MaterialReactTable
        columns={columnas}
        data={clientes}
        state={{ isLoading: cargando }}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
        initialState={{
          sorting: [
            {
              id: 'fecha',
              desc: true,
            },
          ],
        }}
      />
    </Box>
  );
};

export default ListadoClientes;
