/*
import { Slider } from '@mui/material';
import React from 'react';

const SliderProton = ({ value, changedPrice }) => (
  <div>
    <Slider
      value={value}
      onChange={changedPrice}
      valueLabelDisplay="on"
      min={1000000}
      max={30000000}
    />
  </div>
);

export default SliderProton;
*/
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
