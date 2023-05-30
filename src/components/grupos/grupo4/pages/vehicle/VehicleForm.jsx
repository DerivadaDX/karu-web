/*eslint-disable */
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import { inputs } from '../../dto/vehicle-props';
import { GetAllModels } from '../../api/API-methods';
import FormInput from '../../components/FormInput';
import '../../assets/css/formVehicle.css';

const VehicleForm = () => {
  const [values, setValues] =
    useState <
    {} >
    {
      plate: '',
      kilometers: '',
      modelData: {
        brand: '',
        model: '',
        year: '',
        basePrice: 0.0,
      },
    };

  const [models, setModels] = useState([
    { brand: '', model: '', year: '', basePrice: 0.0 },
  ]);

  const [isDropdownInitialized, setIsDropdownInitialized] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    const updateDropdown = async () => {
      const value = await GetAllModels();
      const modelos = value.map((model) => ({
        brand: model.brand,
        model: model.model,
        year: model.year,
        basePrice: model.basePrice,
      }));
      setModels(modelos);
      setIsDropdownInitialized(true);
    };

    if (!isDropdownInitialized) {
      updateDropdown();
    }
  }, [isDropdownInitialized]);

  const { saveVehicle, showSpansaveVehicleError, saveVehicleMessageError } =
    useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveVehicle(values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeDropdown = (e, model) => {
    setValues({ ...values, [e.target.name]: model });
    setSelectedModel(e.target.value);
  };

  return (
    <div className="vehicle-container">
      <form id="form" className="form" onSubmit={handleSubmit}>
        <h2 className="vehicle_form-h2">Cargar datos del auto</h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className="inputs">
          <label>Modelo de auto</label>
          <select
            name="modelData"
            value={selectedModel}
            className="select-style"
            onChange={(e) => onChangeDropdown(e, JSON.parse(e.target.value))}
          >
            <option value="">Seleccione un modelo</option>
            {models.map((model, index) => (
              <option key={index} value={JSON.stringify(model)}>
                {model.brand} {model.model} ({model.year})
              </option>
            ))}
          </select>
        </div>
        <button className="buttons">Enviar</button>
        <span
          className="spans"
          id="paperWork-span"
          style={
            showSpansaveVehicleError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {saveVehicleMessageError}
        </span>
        <Link className="vehicle-container__form-a" to={'/home'}>
          <div>Volver al inicio</div>
        </Link>
      </form>
    </div>
  );
};

export default VehicleForm;
