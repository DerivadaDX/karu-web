/* eslint-disable react/react-in-jsx-scope */
import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { SimpleTabTurnos } from './SimpleTab';

const AgendaTaller = () => (

  <>
    <Box mt="5px">
      <Box display="flex">
        <Header titulo="Turnos" subtitulo="Agenda del taller" />
      </Box>
    </Box>
    <Divider sx={{ color: 'silver' }} />
    <Container maxWidth="xxl" sx={{ mb: 2 }}>
      <SimpleTabTurnos />
    </Container>
  </>

);

export default AgendaTaller;
