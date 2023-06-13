/* eslint-disable react/prop-types */
/*

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 1000000,
    label: '$ 1M',
  },
  {
    value: 8000000,
    label: '$ 8M',
  },
  {
    value: 18000000,
    label: '$ 18M',
  },
  {
    value: 30000000,
    label: '$ 30M',
  },
];

function valuetext(value) {
  return `${value}`;
}

const SliderProton = () => {
  const [value, setValue] = React.useState([3000000, 20000000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={1000000}
        max={30000000}
        marks={marks}
      />
    </Box>
  );
};

export default SliderProton;
*/

import React from 'react';
import { Slider, Box } from '@mui/material';

const SliderProton = ({ value, changePrice }) => (
  <Box sx={{ width: 230 }}>
    <p>Rango de precio</p>
    <Slider
      value={value}
      onChange={changePrice}
      valueLabelDisplay="auto"
      min={400000}
      max={25000000}
    />
  </Box>
);

export default SliderProton;
