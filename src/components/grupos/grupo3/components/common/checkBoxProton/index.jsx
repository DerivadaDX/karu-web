/* eslint-disable react/prop-types */
import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const CheckboxProton = ({ changeChecked, datosCheck }) => {
  const { checked, label, id } = datosCheck;
  return (
    <div>
      <FormControlLabel
        control={(
          <Checkbox
            size="small"
            checked={checked}
            nChange={() => changeChecked(id)}
            inputProps={{ 'aria-label': 'checkbox with small size' }}
          />
        )}
        label={label}
      />
    </div>
  );
};

export default CheckboxProton;
