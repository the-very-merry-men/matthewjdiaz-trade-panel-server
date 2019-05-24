import React from 'react';

const Values = (props) => (
  <ul id="values">
    {props.values.map((value, index) => <li className={props.highlighted === index ? 'highlighted' : ''} key={index} onMouseOver={() => props.highlight(index)} onClick={() => props.handleClick(index)}>{value}</li>)}
  </ul>
);

export default Values;