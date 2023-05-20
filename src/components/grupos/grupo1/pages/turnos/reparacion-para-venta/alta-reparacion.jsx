/* eslint-disable react/function-component-definition */
// Se da de alta el turno para reparación para venta (una vez confirmada la compra de un vehículo)
import * as React from 'react';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Form from './Formulario';

const inter = Inter({ subsets: ['latin'] });

export default function Motivo() {
  return (
    <>
      <Header>
        <title>Autotech</title>
        <meta name="description" content="Compra y venta de vehiculos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Header>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <Form />
        </div>
      </main>
    </>
  );
}
