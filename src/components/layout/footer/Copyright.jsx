import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const actualYear = new Date().getFullYear();
const copyrightText = `Copyright © KarU Website ${actualYear}.`;

const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {copyrightText}
    <br />
    <Link to="/login">Acceso empleados</Link>
  </Typography>
);

export default Copyright;
