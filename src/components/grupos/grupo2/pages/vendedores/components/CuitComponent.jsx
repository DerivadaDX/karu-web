/* eslint-disable react/jsx-props-no-spreading */
import React, {
  createRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const CuitComponent = forwardRef((props, inputRef) => {
  const { onChange, defaultValue, ...other } = props;
  const ref = createRef();
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    onChange({ target: { name: other.name, value } });
  }, [value]);

  return (
    <IMaskInput
      {...other}
      ref={ref}
      mask="00-0000000[0]-0"
      inputRef={inputRef}
      onChange={() => undefined}
      value={value}
      onAccept={(newValue) => {
        setValue(newValue);
      }}
      overwrite
    />
  );
});
CuitComponent.defaultProps = {
  defaultValue: '',
};
CuitComponent.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CuitComponent;
