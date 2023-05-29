/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { Container } from 'react-bootstrap';
import { getChecklist } from '../../services/services-services';
import Alerts from '../../components/common/Alerts';

const DetalleChecklist = (props) => {
  const { serviceId, open, setOpen } = props;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // alertas api
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerChecklist = () => {
    getChecklist(serviceId)
      .then((response) => {
        setItems(response.data);
        setLoading(false);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage('Ha ocurrido un error, disculpe las molestias. Intente nuevamente más tarde. Si el error persiste comunicarse con soporte: soporte-tecnico@KarU.com');
        setAlertType('error');
        setAlertTitle('Error de servidor');
      });
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'elemento',
        header: 'Parte del auto',
      },
      {
        accessorKey: 'tarea',
        header: 'Tarea',
      },
      {
        accessorKey: 'costo_reemplazo',
        header: 'Costo de reemplazo (ARS)',
      },
      {
        accessorKey: 'duracion_reemplazo',
        header: 'Tiempo de reemplazo',
      },
    ],
    [],
  );

  useEffect(() => {
    traerChecklist();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alerts alertType={alertType} description={alertMessage} title={alertTitle} />
      </Box>
      <Container sx={{ mb: 1 }}>
        <MaterialReactTable
          columns={columnas}
          data={items}
          state={{ isLoading: loading }}
          enableToolbarIternalActions={false}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
          positionPagination="top"
          muiTablePaginationProps={{
            rowsPerPageOptions: [5, 10, 20],
            showFirstButton: false,
            showLastButton: false,
            SelectProps: {
              native: true,
            },
            labelRowsPerPage: 'Número de tareas visibles',
          }}
          muiTableHeadCellProps={{ align: 'center' }}
          muiTableBodyCellProps={{ align: 'center' }}
          enableTopToolbar={false}
        />
      </Container>
      {/* Botones que están en la base del popup */}
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Button
          variant="outlined"
          sx={{ mt: 3, ml: 1 }}
          color="primary"
          onClick={() => {
            setOpen(false);
          }}
        >
          Atrás
        </Button>
      </Box>
    </>
  );
};

export default DetalleChecklist;
