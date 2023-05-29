/* eslint-disable react/react-in-jsx-scope */
import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { TabTalleres } from './TabTalleres';

const Talleres = () => (

  <>
    <Box mt="5px">
      <Box display="flex">
        <Header titulo="Talleres" subtitulo="Administración" />
      </Box>
    </Box>
    <Divider sx={{ color: 'silver' }} />
    <Container maxWidth="xxl" sx={{ mb: 2 }}>
      <TabTalleres />
    </Container>
  </>

);

export default Talleres;
