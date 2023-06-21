import { Button } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import Factura from './FacturaPDF';

const GenerarFactura2 = () => (
  <Button>
    <PDFViewer>
      <Factura />
    </PDFViewer>
  </Button>
);

export default GenerarFactura2;
