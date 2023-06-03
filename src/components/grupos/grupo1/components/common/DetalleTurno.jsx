/* eslint-disable consistent-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import DialogActions from '@mui/material/DialogActions';
import {
  Box, Stack, TextField, Button,
} from '@mui/material';

export default function DetalleTurno(props) {
  const {
    openDialog, setOpenDialog, row,
  } = props;

  const definirEstado = (estado) => {
    if (estado === 'en_proceso' || estado === 'en proceso') {
      return ('En proceso');
    } if (estado === 'terminado') {
      return ('Terminado');
    } if (estado === 'cancelado') {
      return ('Cancelado');
    } if (estado === 'pendiente') {
      return ('Pendiente');
    } if (estado === 'rechazado') {
      return ('Rechazado');
    } if (estado === 'ausente') {
      return ('Ausente');
    }
  };

  const definirTipo = (tipo) => {
    if (tipo === 'evaluacion') {
      return ('Evaluación');
    } if (tipo === 'service') {
      return ('Service');
    } if (tipo === 'extraordinario') {
      return ('Extraordinario');
    } if (tipo === 'reparacion') {
      return ('Reparación');
    }
  };

  return (
    <>
      <Stack spacing={1}>
        <TextField
          disabled
          id="standard-disabled"
          label="ID del turno"
          defaultValue={row.id_turno}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Tipo de turno"
          defaultValue={definirTipo(row.tipo)}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Estado"
          defaultValue={definirEstado(row.estado)}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="ID del técnico"
          defaultValue={row.tecnico_id === null ? 'No asignado' : row.tecnico_id}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Patente"
          defaultValue={row.patente}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Fecha de inicio"
          defaultValue={row.fecha_inicio}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Hora de inicio"
          defaultValue={row.hora_inicio}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Fecha de fin"
          defaultValue={row.fecha_fin}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Hora de fin"
          defaultValue={row.hora_fin}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Frecuencia de KM"
          defaultValue={row.frecuencia_km === null ? '-' : row.frecuencia_km}
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
