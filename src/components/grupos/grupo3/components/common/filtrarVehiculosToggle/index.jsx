/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

const FiltroVehiculosToggle = ({ options, value, selectToggle }) => (
  <ToggleButtonGroup
    value={value}
    onChange={selectToggle}
    className="classes.root"
  >
    {options.map(({ label, id, value }) => (
      <ToggleButton className="classes.toggle" key={id} value={value}>
        {label}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);

export default FiltroVehiculosToggle;
