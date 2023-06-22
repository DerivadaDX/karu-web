/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import {
  Snackbar, SnackbarContent, Alert, AlertTitle,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from './AppContext';
import Alerts from '../../../grupo1/components/common/Alerts';
import CotizacionService from '../../services/CotizacionService';
import VehiculoService from '../../services/VehiculoService';
import { UserContext } from '../../../grupo4/context/UsersContext';

/*
cuanto presion el boton cotizar pongo un input donde tiene que rellenar esto datos
*Sucursal : String ---> (se obtiene del auto logrado)
* NombreCliente : String --> (esto identifiqué que se tiene que pedir, porque como vimos, un auto puede estar
    reservado pero otra persona puede ir físicamente y comprarlo)
* Patente : String --> auto
* IdVendedor : String --> usuario logeado
* Garantía extendida : boleean --> con un check

de aca la sucursal la saca del auto que filtro en la tabla. el nombre del cliente ese que le pedimos obligatorio, la
patente del auto que se filtro, el id del vendedor lo consultamos por la sesion que tiene iniciada el usuario,
y la garantia extendida del check que tenemos que hacer
*/

const NuevaPagina = () => {
  const idVendedor = 'Id del Vendedor';

  // const {
  //  updateNombreC, updateEmail, updatePatente, updateGarantiaExtendida,
  // } = useContext(AppContext);
  const [nombreC, setNombreC] = useState('');
  const [mail, setMail] = useState('');
  const [clienteDNI, setDNI] = useState('');
  const [garantiaCheck, setGarantiaExtendida] = useState(false);

  const navigate = useNavigate();

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /* lo llamo de la misma manera que en app.js osea productId y lo desectructuramos */
  /* consumo desde los parametro las variantes del objeto y lo desestructuro el objeto */
  const { productId } = useParams();
  /* dentro de mi erreglo de productos busco
    el producto que en su propiedad id sea igual al productId que viene de los params
    en este caso product.id tiraba error, entonces TIENE que ser string ya que productId es string */
  // const productSelected = products.find((product) => product.id === productId);
  // setear los hooks useState
  const [vehiculo, setVehiculo] = useState([]);
  const [validated, setValidated] = useState(false);
  const { cookie } = useContext(UserContext);

  const user = cookie.get('user');

  // Dentro de tu componente o función
  const getProductData = async (product) => {
    try {
      const response = await VehiculoService.obtenerVehiculo(product);
      if (response) {
        // Manejar los datos de respuesta aquí
        setVehiculo(response.data.result);
      } else {
        // Manejar el error en caso de que la respuesta no sea exitosa
        // sale error
      }
    } catch (error) {
      // Manejar el error de la solicitud
      console.error(error);
    }
  };
  // Llamar a la función para obtener los datos del producto por su ID
  useEffect(() => {
    // mostrar datos locales
    // setVehiculos(localData);
    // mostrar datos desde API
    getProductData(productId);
  }, []);
  const productSelected = vehiculo;

  const handleSubmit = async (event) => {
    event.preventDefault();// para que no se actualice la pantalla al hacer clic

    /* primero valida formulario */
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        /* Aquí puedes utilizar los valores de nombreC y email para realizar las acciones que necesites
              tiene que estar adentro del handleSubmit, no anda por el Link
              aca afuera tira error */
        // updateNombreC(nombreC);
        // updateEmail(email);
        // updatePatente(productSelected.patente);
        // updateGarantiaExtendida(garantiaExtendida);

        // paso datos al back
        const cotizacionData = {
          sucursal: user.branch,
          /* nombreCliente: nombreC, */
          patente: productSelected.plate, // infoCotizacion.patente,
          /* email: mail, */
          dni: clienteDNI,
          idVendedor: user.id,
          /* precioBase: 1000000, */
          garantiaExtendida: garantiaCheck,
        };
        const response = await CotizacionService.guardarCotizacion(cotizacionData);
        console.log(response.data);

        const infoCotizacion = response.data;
        sessionStorage.setItem('cotizacion', JSON.stringify(infoCotizacion));

        navigate('/boleta-cotizacion');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // El servidor devolvió un error 400
          console.error(error.response.data); // Muestra la respuesta del servidor en la consola
          setAlertType('Error');
          setAlertTitle('Error en la solicitud');
          setErrorMessage('Ocurrió un error en la solicitud. Por favor, verifique que los datos sean correctos e intente nuevamente.');
          setShowErrorSnackbar(true);
        } else {
          // Otro tipo de error, como un error de red o un error en el servidor
          console.error(error);
          setAlertType('Error');
          setAlertTitle('Error en el servidor');
          setAlertMessage('Error en el servidor. Por favor, vuelva a intentarlo nuevamente.');
        }
        // sessionStorage.setItem('cotizacion', JSON.stringify(infoCotizacion))
      }
    }
  };

  const handleSnackbarClose = () => {
    setShowErrorSnackbar(false);
  };

  return (
    <div>
      <h1 id="titulo-formulario">Cotización</h1>
      <Form id="formulario" noValidate validated={validated} onSubmit={handleSubmit}>

        {/* -----Sucursal------ */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextSucursal">
          <Form.Label column sm="2">
            Sucursal:
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={user.branch} />
          </Col>
        </Form.Group>
        {/* <Form.Group as={Row} md="6" controlId="validationCustom03">
                    <Form.Label column >Sucursal:</Form.Label>
                    <div class="alert alert-primary mt-2 mb-4" role="alert">
                        Agrego datos <span id="totalPago" class="align-middle"></span>
                    </div>
                </Form.Group> */}

        {/* -----Nombre del Cliente------
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextNombreC">
          <Form.Label column sm="2">
            Nombre del Cliente:
          </Form.Label>
          <Col sm="10">

            <Form.Control
              type="text"
              placeholder="Agregue el Nombre del Cliente"
              value={nombreC}
              onChange={(event) => setNombreC(event.target.value)}
              required
            />

            <Form.Control.Feedback type="invalid">
              Por favor, proporcione un Nombre del Cliente válido.
            </Form.Control.Feedback>
          </Col>
        </Form.Group> */}

        {/* -----Mail del Cliente------
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Mail del Cliente:
          </Form.Label>
          <Col sm="10">

            <Form.Control
              type="email"
              placeholder="Agregue el mail del cliente"
              value={mail}
              onChange={(event) => setMail(event.target.value)}
              required
            />

            <Form.Control.Feedback type="invalid">
              Por favor, proporcione un Email válido.
            </Form.Control.Feedback>
          </Col>
        </Form.Group> */}

        {/* <Form.Group as={Row} md="6" controlId="validationCustom03">
                    <Form.Label column sm={2}>Nombre del Cliente</Form.Label>
                    <Form.Control type="text" placeholder="Agregue el Nombre del Cliente" required />
                    <Form.Control.Feedback type="invalid">
                        Por favor, proporcione un Nombre del Cliente válido.
                    </Form.Control.Feedback>
                </Form.Group> */}

        {/* -----DNI Cliente------ */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextDNI">
          <Form.Label column sm="2">
            DNI:
          </Form.Label>
          <Col sm="10">

            <Form.Control
              type="text"
              placeholder="Agregue el dni del Cliente"
              value={clienteDNI}
              onChange={(event) => setDNI(event.target.value)}
              minLength="7"
              maxLength="8"
              pattern="(\d{8}|[A-Z]\d{7})$"
              required
            />

            <Form.Control.Feedback type="invalid">
              Por favor, proporcione un DNI válido de 8 caracteres sin puntos.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* -----Patente------ */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPatente">
          <Form.Label column sm="2">
            Patente:
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={productSelected.plate} />
          </Col>
        </Form.Group>

        {/* -----IdVendedor------ */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextIdv">
          <Form.Label column sm="2">
            IdVendedor:
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={user.id} />
            {console.log(user)}
          </Col>
        </Form.Group>

        {/* -----Garantía extendida------ */}
        <Form.Group className="mb-3" controlId="checkGarantia">
          <Form.Check
            label="Garantía extendida"
            checked={garantiaCheck}
            onChange={(event) => setGarantiaExtendida(event.target.checked)}
          />
        </Form.Group>

        {/* -----Al finalizar me pide validar------ */}
        <Button type="submit">Finalizar</Button>
      </Form>

      <Snackbar
        open={showErrorSnackbar}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '400px',
        }}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'red' }} // Set your desired background color here
          message={(
            <Alert onClose={handleSnackbarClose} severity="error">
              <AlertTitle>{alertTitle}</AlertTitle>
              {errorMessage}
            </Alert>
          )}
        />
      </Snackbar>
    </div>
  );
};

export default NuevaPagina;
