/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { products } from './products';
import { AppContext } from './AppContext';

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
  const [garantiaCheck, setGarantiaExtendida] = useState(false);

  const navigate = useNavigate();

  /* lo llamo de la misma manera que en app.js osea productId y lo desectructuramos */
  /* consumo desde los parametro las variantes del objeto y lo desestructuro el objeto */
  const { productId } = useParams();
  /* dentro de mi erreglo de productos busco
    el producto que en su propiedad id sea igual al productId que viene de los params
    en este caso product.id tiraba error, entonces TIENE que ser string ya que productId es string */

  const productSelected = products.find((product) => product.id === productId);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();// para que no se actualice la pantalla al hacer clic

    /* primero valida formulario */
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        /* Aquí puedes utilizar los valores de nombreC y email para realizar las acciones que necesites
              tiene que estar adentro del handleSubmit, no anda por el Link
              aca afuera tira error */
        /* agrego- 16-05 */
        // updateNombreC(nombreC);
        // updateEmail(email);
        // updatePatente(productSelected.patente);
        // updateGarantiaExtendida(garantiaExtendida);

        // paso datos al back
        const url = 'http://34.139.89.18:8181/api-gc/cotizaciones/save';
        const cotizacionData = {
          sucursal: 'S-01',
          nombreCliente: nombreC,
          patente: productSelected.patente, // infoCotizacion.patente,
          email: mail,
          idVendedor: 123,
          precioBase: 1000000,
          garantiaExtendida: garantiaCheck,
        };
        const response = await axios.post(url, cotizacionData);
        console.log(response.data);

        const infoCotizacion = response.data;
        sessionStorage.setItem('cotizacion', JSON.stringify(infoCotizacion));

        navigate('/boleta-cotizacion');
      } catch (error) {
        console.error(error);
      }
      // sessionStorage.setItem('cotizacion', JSON.stringify(infoCotizacion))
    }
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
            <Form.Control plaintext readOnly defaultValue="Surcusal del vendedor" />
          </Col>
        </Form.Group>
        {/* <Form.Group as={Row} md="6" controlId="validationCustom03">
                    <Form.Label column >Sucursal:</Form.Label>
                    <div class="alert alert-primary mt-2 mb-4" role="alert">
                        Agrego datos <span id="totalPago" class="align-middle"></span>
                    </div>
                </Form.Group> */}

        {/* -----Nombre del Cliente------ */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextNombreC">
          <Form.Label column sm="2">
            Nombre del Cliente:
          </Form.Label>
          <Col sm="10">

            {/* agrego- 16-05 */}
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
        </Form.Group>

        {/* -----Mail del Cliente------ */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Mail del Cliente:
          </Form.Label>
          <Col sm="10">

            {/* agrego- 16-05 */}
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
        </Form.Group>

        {/* <Form.Group as={Row} md="6" controlId="validationCustom03">
                    <Form.Label column sm={2}>Nombre del Cliente</Form.Label>
                    <Form.Control type="text" placeholder="Agregue el Nombre del Cliente" required />
                    <Form.Control.Feedback type="invalid">
                        Por favor, proporcione un Nombre del Cliente válido.
                    </Form.Control.Feedback>
                </Form.Group> */}

        {/* -----Patente------ */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPatente">
          <Form.Label column sm="2">
            Patente:
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={productSelected.patente} />
          </Col>
        </Form.Group>

        {/* -----IdVendedor------ */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextIdv">
          <Form.Label column sm="2">
            IdVendedor:
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="Id del Vendedor" />
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

        {/* -----Asi me pide validar------ */}
        <Button type="submit">Finalizar</Button>

        {/* ----- Asi no me valida ------
                <Link to="/boleta-cotizacion">
                <Button type="submit" >Finalizar</Button>
                </Link> */}

      </Form>
    </div>
  );
};

export default NuevaPagina;
