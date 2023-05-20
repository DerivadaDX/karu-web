//Se da de alta el turno para reparación para venta (una vez confirmada la compra de un vehículo)
import Head from 'next/head'
import * as React from 'react';
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import Form from './Formulario';

const inter = Inter({ subsets: ['latin'] })


export default function Motivo() {
    return (
        <>
            <Head>
                <title>Autotech</title>
                <meta name="description" content="Compra y venta de vehiculos" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <div>
                    <Form />
                </div>
            </main>
        </>
    );
}