/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import Roles from '../../../../roles';
import GridReportes from './GridReportes';
import Header from '../../../grupo1/components/common/Header';

const ReportesG4 = () => (
  <>
    <Box m="2px">
      <Box display="flex">
        <Header titulo="Reportes de vehículos" />
      </Box>
      <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)' }} />
    </Box>
    <GridReportes />
  </>
);

export default ReportesG4;
