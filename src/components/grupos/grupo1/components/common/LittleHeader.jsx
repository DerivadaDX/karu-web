/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { Typography, Box } from '@mui/material';

const LittleHeader = ({ titulo, subtitulo, descripcion }) => (
  <Box className="justify-content-start" display="flex" flexDirection="column" alignItems="self-start">
    <Typography variant="h6" color="black" fontWeight="bold" sx={{ mb: '0' }}>{titulo}</Typography>
    <Typography color="gray">{subtitulo}</Typography>
    <Typography variant="p" sx={{ fontSize: '0.9rem' }} color="black">{descripcion}</Typography>
  </Box>
);

export default LittleHeader;
