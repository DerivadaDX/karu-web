/*eslint-disable */
import { Box } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Alerts from '../../../grupo1/components/common/Alerts';
import MaterialReactTable from 'material-react-table';
import { getAllPriceHistory } from '../../api/API-methods';

function PriceHistory() {
  const [history, setHistory] = useState([]);

  const getPriceHistory = async () => {
    const prices = await getAllPriceHistory();
    setHistory(prices.data.result);
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'reference',
        header: 'Referencia',
      },
      {
        accessorKey: 'message',
        header: 'Mensaje',
      },
      {
        accessorKey: 'newSellPrice',
        header: 'Nuevo precio de venta',
      },
      {
        accessorKey: 'newBasePrice',
        header: 'Nuevo precio base',
      },
      {
        accessorKey: 'updateDate',
        header: 'Fecha actualización',
      },
      {
        accessorKey: 'massivePercentage',
        header: 'Porcentaje masivo',
      },
    ],
    []
  );

  useEffect(() => {
    try {
        getPriceHistory();
        
    } catch (error) {
    }
  }, []);

  return (
    <Box style={{ overflowX: 'auto' }}>
      <MaterialReactTable
        columns={columnas}
        data={history}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
      />
    </Box>
  );
}

export default PriceHistory;
