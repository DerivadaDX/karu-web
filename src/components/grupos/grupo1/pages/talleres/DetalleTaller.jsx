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

export default function DetalleTaller(props) {
  const {
    openDialog, setOpenDialog, row,
  } = props;

  return (
    <>
      <Stack spacing={1}>
        <TextField
          disabled
          id="standard-disabled"
          label="ID del taller"
          defaultValue={row.id_taller}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Nombre"
          defaultValue={row.nombre}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Dirección"
          defaultValue={row.direccion}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Localidad"
          defaultValue={row.localidad}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Provincia"
          defaultValue={row.provincia}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="C.P."
          defaultValue={row.cod_postal}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Mail"
          defaultValue={row.mail}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Teléfono"
          defaultValue={row.telefono}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Zonas de trabajo"
          defaultValue={row.capacidad}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Cantidad de técnicos"
          defaultValue={row.cant_tecnicos}
          variant="standard"
        />
      </Stack>
      <Box>
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
