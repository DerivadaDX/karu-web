import React from 'react';

import {
  Box,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';

const Encabezado = ({ titulo, subtitulo }) => (
  <Box id="Encabezado" mb={1}>
    <Typography variant="h3" color={(theme) => theme.palette.text.primary} fontWeight="bold">
      {titulo}
    </Typography>
    <Typography variant="h6" color={(theme) => theme.palette.text.secondary}>
      {subtitulo}
    </Typography>
  </Box>
);

Encabezado.propTypes = {
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string,
};

Encabezado.defaultProps = {
  subtitulo: '',
};

export default Encabezado;
