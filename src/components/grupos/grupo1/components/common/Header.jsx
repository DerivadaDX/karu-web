/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { Typography, Box } from '@mui/material';

const Header = ({ titulo, subtitulo, descripcion }) => (
  <Box m="1.5rem" className="justify-content-start" display="flex" flexDirection="column" alignItems="self-start">
    <Typography variant="h3" color="black" fontWeight="bold" sx={{ mb: '5' }}>{titulo}</Typography>
    <Typography variant="h6" color="gray">{subtitulo}</Typography>
    <Typography className="mt-3" variant="p" color="black">{descripcion}</Typography>
  </Box>
);

export default Header;
