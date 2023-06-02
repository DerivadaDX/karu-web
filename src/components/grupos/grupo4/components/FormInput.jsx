/*eslint-disable */
import { useState } from 'react';
import { Alert, Paper, TextField } from '@mui/material';
import '../assets/css/formRegister.css';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <Paper>
      <label>{label}</label>
      <TextField
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <Alert severity="error">{errorMessage}</Alert>
    </Paper>
  );
};

export default FormInput;
