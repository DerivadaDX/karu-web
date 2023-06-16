/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const GridReportes = (props) => {
  const { idTaller } = props;

  const fecha = new Date();

  const anio = fecha.getFullYear();
  let mes = fecha.getMonth() + 1;
  let dia = fecha.getDate() + 1;

  if (mes < 10) {
    mes = `0${mes}`;
  }

  if (dia < 10) {
    dia = `0${dia}`;
  }

  // por defecto se muestra desde el 1 de enero hasta el día siguiente al actual
  const fechaHasta = `${anio}-${mes}-${dia}`;
  const fechaDesde = `${anio}-01-01`;

  function obtenerPrimerNumero(str) {
    // Expresión regular para encontrar el primer número que comienza con un dígito distinto de cero
    const regex = /[1-9][0-9]*/;

    // Buscar el primer número en el string
    const match = str.match(regex);

    // Devolver el número encontrado o null si no se encontró ninguna coincidencia
    if (match !== null) {
      // eslint-disable-next-line radix
      return parseInt(match[0]);
    }
    return null;
  }

  const idTallerNro = obtenerPrimerNumero(idTaller);

  const urlTurnosPendientes = `https://metabase-insomnia.mooo.com/public/question/981cf28d-d0e2-43e2-b033-4855a0cb4ff3?id_taller=${idTallerNro}#hide_parameters=id_taller`;

  const urlTurnosPorTipo = `https://metabase-insomnia.mooo.com/public/question/340c3b21-d710-420d-9bb6-f3ee3b09c4f7?id_taller=${idTallerNro}#hide_parameters=id_taller`;

  const urlTurnosPorEstado = `https://metabase-insomnia.mooo.com/public/question/59fbe462-377e-4e62-91c5-baac89597d06?id_taller=${idTallerNro}#hide_parameters=id_taller`;

  const urlCantPendientes = `https://metabase-insomnia.mooo.com/public/question/489013da-5113-42cd-995d-c53268151a8b?id_taller=${idTallerNro}#hide_parameters=id_taller`;

  const urlUsoDelTaller = `https://metabase-insomnia.mooo.com/public/question/59b8764d-3758-44c0-96a8-4ce009940194?id_taller=${idTallerNro}&desde=${fechaDesde}&hasta=${fechaHasta}#hide_parameters=id_taller`;

  const iframeStyles = {
    border: '1px solid #acacac',
    borderRadius: '10px',
    boxShadow: '0 5px 10px rgba(51, 51, 51, 0.6)',
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={12} md={4}>
          <iframe
            title="Cant pendientes"
            src={urlCantPendientes}
            width="100%"
            height="450rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <iframe
            title="Turnos por estado"
            src={urlTurnosPorEstado}
            width="100%"
            height="450rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <iframe
            title="Turnos pendientes"
            src={urlTurnosPendientes}
            width="100%"
            height="400rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <iframe
            title="Turnos por tipo"
            src={urlTurnosPorTipo}
            width="100%"
            height="400rem"
            style={iframeStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <iframe
            title="Tasa de uso del taller"
            src={urlUsoDelTaller}
            width="100%"
            height="400rem"
            style={iframeStyles}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GridReportes;
