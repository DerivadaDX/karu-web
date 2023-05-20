import LoggedInLayout from '../components/generales/LoggedInLayout';
import Container from '@mui/material/Container';
import VisualizacionBusquedaTecnicos from './VisualizacionFiltroBusqueda';
import Header from '../components/generales/Header';
import { Box } from '@mui/material';

const ControlTecnicos = () => {
  return (
    <LoggedInLayout>
      <Box>
        <Box display="flex">
          <Header
            titulo="Técnicos"
            subtitulo="Búsqueda y filtrado"
            descripcion={
              'Información sobre los técnicos y sus trabajos realizados'
            }
          />
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <VisualizacionBusquedaTecnicos />
      </Container>
    </LoggedInLayout>
  );
};

export default ControlTecnicos;
