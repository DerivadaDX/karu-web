/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

const FiltroVehiculosToggle = ({
  options,
  value,
  selectToggle,
  titulo,
}) => (
  <Box>
    <p>{titulo}</p>
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={selectToggle}
      size="small"
    >
      {options.map(({ label, id, value }) => (
        <ToggleButton key={id} value={value}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </Box>
);

export default FiltroVehiculosToggle;
