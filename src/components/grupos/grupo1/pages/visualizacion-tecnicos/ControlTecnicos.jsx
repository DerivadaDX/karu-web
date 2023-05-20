/* eslint-disable react/react-in-jsx-scope */
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import VisualizacionBusquedaTecnicos from './VisualizacionFiltroBusqueda';
import Header from '../../components/common/Header';

const ControlTecnicos = () => (
  <>
    <Box>
      <Box display="flex">
        <Header
          titulo="Técnicos"
          subtitulo="Búsqueda y filtrado"
          descripcion="Información sobre los técnicos y sus trabajos realizados"
        />
      </Box>
    </Box>
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <VisualizacionBusquedaTecnicos />
    </Container>
  </>
);

export default ControlTecnicos;
