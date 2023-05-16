import * as React from 'react';
import Typography from '@mui/material/Typography';

const actualYear = new Date().getFullYear();
const copyrightText = `Copyright © Administración Website ${actualYear}.`;

const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {copyrightText}
  </Typography>
);

export default Copyright;
