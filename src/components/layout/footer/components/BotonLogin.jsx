import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';

const BotonLogIn = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    <Link to="/login" style={{ color: 'inherit' }}>
      Acceso empleados
    </Link>
  </Typography>
);

export default BotonLogIn;
