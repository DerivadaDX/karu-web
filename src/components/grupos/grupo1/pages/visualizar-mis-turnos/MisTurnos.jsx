/* eslint-disable react/react-in-jsx-scope */
import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { TabMisTurnos } from './TabMisTurnos';

const MisTurnos = () => (
  <>
    <Box mt="5px">
      <Box display="flex">
        <Header titulo="Mis Turnos" subtitulo="Area de trabajo" />
      </Box>
    </Box>
    <Divider sx={{ color: 'silver' }} />
    <Container maxWidth="xxl" sx={{ mb: 2 }}>
      <TabMisTurnos />
    </Container>
  </>
);

export default MisTurnos;
