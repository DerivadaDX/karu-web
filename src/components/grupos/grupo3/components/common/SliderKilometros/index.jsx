/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 10,
    label: '10KM',
  },
  {
    value: 20000,
    label: '20KM',
  },
  {
    value: 90000,
    label: '90KM',
  },
  {
    value: 150000,
    label: '150KM',
  },
];

function valuetext(value) {
  return `${value}`;
}

const SliderKilometros = ({ value, changeKM }) => (
  <Box sx={{ width: 230 }}>
    <p>Kilometraje</p>
    <Slider
      getAriaLabel={() => 'Kilometers range'}
      value={value}
      onChange={changeKM}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      min={100}
      max={300000}
      marks={marks}
    />
  </Box>
);

export default SliderKilometros;
