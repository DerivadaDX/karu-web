import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 1000,
    label: '1KM',
  },
  {
    value: 4000,
    label: '4KM',
  },
  {
    value: 9000,
    label: '9KM',
  },
  {
    value: 12000,
    label: '12KM',
  },
];

function valuetext(value) {
  return `${value}`;
}

const SliderKilometros = () => {
  const [value, setValue] = React.useState([3000, 6000]);

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
        min={1000}
        max={12000}
        marks={marks}
      />
    </Box>
  );
};

export default SliderKilometros;
