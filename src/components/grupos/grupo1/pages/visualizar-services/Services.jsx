/* eslint-disable react/react-in-jsx-scope */
import { Box, Container, Divider } from '@mui/material';
import Header from '../../components/common/Header';
import { TabServices } from './TabServices';

const Services = () => (

  <>
    <Box mt="5px">
      <Box display="flex">
        <Header titulo="Services" subtitulo="Administración" />
      </Box>
    </Box>
    <Divider sx={{ color: 'silver' }} />
    <Container maxWidth="xxl" sx={{ mb: 2 }}>
      <TabServices />
    </Container>
  </>

);

export default Services;
