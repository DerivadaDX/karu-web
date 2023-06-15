/* eslint-disable react/prop-types */
import React from 'react';
import ListItem from './ListaItem';
import './styles.css';

const List = ({ list }) => (
  <div className="list-wrap">
    {list.map((item) => <ListItem key={item.plate} item={item} />)}
  </div>
);

export default List;
