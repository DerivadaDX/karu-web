/*eslint-disable */
import { useState } from 'react';
import '../assets/css/formRegister.css';

const FormInput = (props: any) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="inputs">
      <label>{label}</label>
      <input
        className="inputs-register"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="spans">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
