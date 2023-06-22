/* eslint-disable no-unused-vars */
import React from 'react';

import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';

const COL_ANCHO_1 = 10;
const COL_ANCHO_2 = 20;
const styles = StyleSheet.create({
  tabla: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: '1',
    borderRightWidth: '0',
    borderBottomWidth: '0',
    marginTop: 20,
  },
  tablaFila: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tablaColumna1: {
    width: `${COL_ANCHO_1}%`,
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tablaColumna2: {
    width: `${COL_ANCHO_2}%`,
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tablaCeldaHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 500,
  },
  anchoColumna1: {
    width: `${COL_ANCHO_1}%`,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  anchoColumna2: {
    width: `${COL_ANCHO_2}%`,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tablaCelda: {
    margin: 5,
    fontSize: 10,
  },
});

const Factura = () => (
  <Document>
    <Page size="A4">
      <View style={{ padding: '15px' }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ width: '100px' }}
              src="Imagen representativa elemento de la empresa.JPG"
            />
            <View style={{ flex: 2 }}>
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
                <Image src="logo.JPG" />
                <Text style={{ textAlign: 'center', fontSize: '12px' }}>
                  COMPRA Y VENTA DE AUTOS USADOS CON LA MEJOR CALIDAD
                  Y LOS MEJORES PRECIOS EN EL MERCADO
                </Text>
                <Text>  </Text>
                <Text>  </Text>
                <Text>  </Text>
                <Text>  </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '5px',
                border: '1px solid #000',
                padding: '20px',
                borderRadius: '10px',
              }}
              >
                <Text> ..</Text>
                <Text> COMPROBANTE DE PAGO </Text>
                <Text> ID DE COTIZACION ASOCIADA </Text>
              </View>
            </View>

          </View>
        </View>
      </View>
    </Page>

  </Document>

);

export default Factura;
