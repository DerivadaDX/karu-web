import * as React from 'react';
import { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { getBalance } from '../services/services';

const CODIGO_CUENTA = 1683429886806;

const styles = {
  list: {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  },
  balanceTypography: {
    fontSize: '2rem',
    textAlign: 'left',
  },
};

const getAsCurrency = (numero) => numero?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) ?? '';

const Balance = () => {
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    getBalance(CODIGO_CUENTA).then((response) => setBalance(response.data));
  }, []);

  return (
    <List sx={styles.list}>
      <ListItem>
        <ListItemText
          primary={getAsCurrency(balance.saldo_actual)}
          primaryTypographyProps={styles.balanceTypography}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="CBU/CVU" secondary={balance.codigo_unico} />
      </ListItem>
      <Divider component="li" />
    </List>
  );
};

export default Balance;
