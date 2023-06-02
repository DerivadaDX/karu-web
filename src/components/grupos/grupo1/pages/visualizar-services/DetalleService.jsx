/* eslint-disable consistent-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import DialogActions from '@mui/material/DialogActions';
import {
  Box, Stack, TextField, Button,
} from '@mui/material';

export default function DetalleService(props) {
  const {
    openDialog, setOpenDialog, row,
  } = props;

  const definirActivo = (estado) => {
    if (estado === false) {
      return ('No activo');
    } if (estado === true) {
      return ('Activo');
    }
  };

  return (
    <>
      <Stack spacing={1}>
        <TextField
          disabled
          id="standard-disabled"
          label="ID del service"
          defaultValue={row.id_service}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Marca"
          defaultValue={row.marca}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Modelo"
          defaultValue={row.modelo}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Frecuencia de km"
          defaultValue={row.frecuencia_km}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Costo base (ARS)"
          defaultValue={row.costo_base}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Costo total (ARS)"
          defaultValue={row.costo_total}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Duración total (minutos)"
          defaultValue={row.duracion_total}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Fecha de creación"
          defaultValue={row.fecha_creacion}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="ID supervisor creador"
          defaultValue={row.id_supervisor}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Activo"
          defaultValue={definirActivo(row.activo)}
          variant="standard"
        />
      </Stack>
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            sx={{ marginTop: '10px' }}
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Atrás
          </Button>
        </DialogActions>
      </Box>
    </>
  );
}
