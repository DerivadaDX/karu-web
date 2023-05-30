/*eslint-disable */
import { Link } from 'react-router-dom';
import '../../assets/css/formVehicle.css';
import FormInput from '../../components/FormInput';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import { inputs } from '../../dto/model-props';

const ModelForm = () => {
  const [values, setValues] = useState({
    brand: '',
    model: '',
    year: '',
    basePrice: 0.0,
  });

  const {
    saveVehicleModel,
    showSpansaveModelError,
    saveModelMessageError,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveVehicleModel(values);
  };

  const onChange = (e) => {
    if (e.target.name.startsWith('float.')) {
      const valueFloat = parseFloat(e.target.value);
      const field = e.target.name.split('.')[1];
      setValues({ ...values, [field]: valueFloat });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="vehicle-container">
      <form id="form" className="form" onSubmit={handleSubmit}>
        <h2 className="vehicle_form-h2">Cargar modelo de auto</h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <span
          className="spans"
          id="paperWork-span"
          style={
            showSpansaveModelError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {saveModelMessageError}
        </span>
        <button className="buttons">Enviar</button>
        <Link className="vehicle-container__form-a" to={'/'}>
          <div>Volver al inicio</div>
        </Link>
      </form>
    </div>
  );
};

export default ModelForm;
