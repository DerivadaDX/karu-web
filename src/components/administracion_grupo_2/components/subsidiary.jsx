import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../common/Title';
import { useEffect } from 'react';
import { useState } from 'react';
import { getSubsidiary } from '../../services';


export default function Subsidiary() {
    const [subsidiary,setSubsidiary]=useState([]);

    useEffect(()=>{
        getSubsidiary().then(response=> setSubsidiary(response.data,));
      },[])

      return (
        <React.Fragment>
            <Title>Sucursal info</Title>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell style={{ fontSize: "1.5rem" }}>{subsidiary.nombre}</TableCell>
                    </TableRow>
                    <TableRow></TableRow>
                    <TableRow>
                        <TableCell>Direccion:</TableCell>
                        <TableCell>{subsidiary.Calle}</TableCell>
                        <TableCell>Altura:</TableCell>
                        <TableCell>{subsidiary.numero}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Localidad:</TableCell>
                        <TableCell>{subsidiary.localidad}</TableCell>
                        <TableCell>Provincia:</TableCell>
                        <TableCell>{subsidiary.provincia}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
        );
}