import React from 'react';

const Values = (props) => (
  <ul id="values">
    {props.values.map(value => <li key={value}>{value}</li>)}
  </ul>
);

export default Values;