/* eslint-disable react/prop-types */
import React from 'react';
import { Slider, Box } from '@mui/material';

const marks = [
  {
    value: 1000000,
    label: '1M',
  },
  {
    value: 9000000,
    label: '9M',
  },
  {
    value: 15000000,
    label: '15M',
  },
  {
    value: 25000000,
    label: '25M',
  },
];

const SliderProton = ({ value, changePrice }) => (
  <Box sx={{ width: 230 }}>
    <p>Rango de precio</p>
    <Slider
      value={value}
      onChange={changePrice}
      valueLabelDisplay="auto"
      min={400000}
      max={25000000}
      marks={marks}
    />
  </Box>
);

export default SliderProton;
