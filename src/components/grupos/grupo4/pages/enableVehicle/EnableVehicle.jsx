/* eslint-disable */
import { Alert, Box, Button, Paper, Stack, TextField } from '@mui/material';
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { UserContext } from '../../context/UsersContext';
import MaterialReactTable from 'material-react-table';

const EnableVehicle = () => {
  const [plate, setPlateState] = useState('');
  const [isValidVehicle, setIsValidVehicle] = useState(false);
  const [firstImage, setFirstImage] = useState('');
  const [secondImage, setSecondImage] = useState('');
  const [thirdImage, setThirdImage] = useState('');
  const {
    getVehicleByPlate,
    vehicleData,
    EnableVehicleMessageError,
    showSpanEnableVehicle,
    updateImageForEnableVehicleMessageError,
    showSpanImageForEnableVehicle,
    imagePublishForEnableVehicle,
  } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const v = await getVehicleByPlate(plate);
    if (v) {
      setIsValidVehicle(true);
    }
  };

  const submitHandlerImages = async (e) => {
    e.preventDefault();
    const enableVehicle = {
      plate: vehicleData[0].plate,
      photo1: firstImage,
      photo2: secondImage,
      photo3: thirdImage,
      branch: vehicleData[0].branch,
    };
    if (await imagePublishForEnableVehicle(enableVehicle)) {
      window.alert('IMAGENES CARGADAS!');
      window.location.reload(true)
    }
  };



  const columnas = useMemo(
    () => [
      {
        accessorKey: 'plate',
        header: 'Patente',
      },
      {
        accessorKey: 'sellPrice',
        header: 'Precio de venta',
      },
      {
        accessorKey: 'branch',
        header: 'Sucursal',
      },
      {
        accessorKey: 'kilometers',
        header: 'Kilometros',
      },
      {
        accessorKey: 'brand',
        header: 'Marca',
      },
      {
        accessorKey: 'model',
        header: 'Modelo',
      },
      {
        accessorKey: 'year',
        header: 'Año',
      },
    ],
    []
  );

  return (
    <Paper>
      <Paper
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Stack
          component="form"
          onSubmit={submitHandler}
          sx={{ width: '70%', display: 'flex', textAlign: 'center' }}
        >
          <TextField
            variant="filled"
            label="Patente"
            onChange={(e) => {
              setPlateState(e.target.value);
            }}
            required
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ marginBottom: '2em' }}
          >
            Buscar
          </Button>
          <Alert
            severity="warning"
            style={
              showSpanEnableVehicle ? { display: 'block' } : { display: 'none' }
            }
          >
            {EnableVehicleMessageError}
          </Alert>
        </Stack>
      </Paper>

      <Paper
        style={isValidVehicle ? { display: 'block' } : { display: 'none' }}
      >
        <Box style={{ overflowX: 'auto' }}>
          <MaterialReactTable
            columns={columnas}
            data={vehicleData}
            defaultColumn={{ minSize: 10, maxSize: 100 }}
            displayColumnDefOptions={{
              'mrt-row-actions': {
                header: 'Acciones',
              },
            }}
          />
        </Box>

        <Stack
          component="form"
          onSubmit={submitHandlerImages}
          sx={{ display: 'flex', textAlign: 'center' }}
        >
          <TextField
            variant="filled"
            label="Cargar primer imagen"
            onChange={(e) => {
              setFirstImage(e.target.value);
            }}
            required
          />
          <TextField
            variant="filled"
            label="Cargar segunda imagen"
            onChange={(e) => {
              setSecondImage(e.target.value);
            }}
            required
          />
          <TextField
            variant="filled"
            label="Cargar tercer imagen"
            onChange={(e) => {
              setThirdImage(e.target.value);
            }}
            required
          />
          <Alert
            severity="error"
            style={
              showSpanImageForEnableVehicle
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {updateImageForEnableVehicleMessageError}
          </Alert>
          <Button variant="contained" type="submit">
            Publicar
          </Button>
        </Stack>
      </Paper>
    </Paper>
  );
};

export default EnableVehicle;