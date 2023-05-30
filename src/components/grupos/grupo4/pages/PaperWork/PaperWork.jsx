/*eslint-disable */
import React, { useContext, useState } from 'react';
import { inputs } from '../../dto/paperwork-props';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formPaperWork.css';
import { Link } from 'react-router-dom';

const defaultState = {
  plate: '',
  infractions: false,
  debt: 0,
  vpa: false,
  rva: false,
  vtv: false,
};

const PaperWork = () => {
  const [state, setState] = useState(defaultState);
  const { sendPaperWorkData, showSpanPaperWorkError, paperWorkMessageError } =
    useContext(UserContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value === 'SI' ? true : value === 'NO' ? false : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendPaperWorkData(state);
  };

  return (
    <>
      <div className="documentation-container">
        <form onSubmit={handleSubmit} className="form-paperWork">
          <h2 className="form-h2">DOCUMENTACION DEL VEHICULO</h2>
          {inputs.map((input) => (
            <div key={input.id} className="input-group">
              <label>
                <p className="input-title">{input.title}</p>
                {input.type === 'select' ? (
                  <select
                    className="select-style"
                    name={input.name}
                    value={state[input.name] ? 'SI' : 'NO'}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione...</option>
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                  </select>
                ) : (
                  <input
                    type={input.type}
                    name={input.name}
                    required={input.required}
                    value={state[input.name]?.toString() || ''}
                    onChange={handleInputChange}
                    placeholder={input.placeholder}
                    className="inputs-paperWork"
                  />
                )}
              </label>
            </div>
          ))}
          <input
            className="buttons-paperWork"
            type="submit"
            value="Enviar"
            id="send-paperWork-button"
          />
          <span
            className="spans"
            id="paperWork-span"
            style={
              showSpanPaperWorkError
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {paperWorkMessageError}
          </span>
          <Link className="vehicle-container__form-a" to="/home">
            <div>Volver al inicio</div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default PaperWork;
