import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getBalance } from '../../services';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const CODIGO_CUENTA = 1683429886806;

const getAsCurrency = numero => numero?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) ?? '';

const listStyle = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

const balanceTypographyProps = {
  fontSize: '2rem',
  textAlign: 'left',
};

const Balance = () => {
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    getBalance(CODIGO_CUENTA).then(response => setBalance(response.data));
  }, []);

  return <React.Fragment>
    <List sx={listStyle}>
      <ListItem>
        <ListItemText primary={getAsCurrency(balance.saldo_actual)} primaryTypographyProps={balanceTypographyProps} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="CBU/CVU" secondary={balance.codigo_unico} />
      </ListItem>
      <Divider component="li" />
    </List>
  </React.Fragment>;
};

export default Balance;
