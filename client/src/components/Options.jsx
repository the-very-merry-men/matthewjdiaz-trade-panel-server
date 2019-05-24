import React from 'react';
import $ from 'jquery';

const validateInput = (e, type, dataKey) => {
  const regex = /\d+\.?\d*/i;
  const input = e.target.value;
  const match = input.match(regex);
  const extract = match ? match[0] : ``;
  const thisForm = `#input-lg[data-key=\"${dataKey}\"]`;
  $(thisForm).val(input ? type === 'currency' ? `$${extract}` : `${extract}` : ``);
  $(thisForm).css({ color: type === 'digit' && extract.includes('.') ? 'red' : '' });
}

const renderSwitch = (type, payload, dataKey) => {
  switch(type) {
    case 'input':
      return <input type="text" id="input-lg" data-key={dataKey} autoComplete="off" onChange={e => validateInput(e, payload ? 'currency' : 'digit', dataKey)} placeholder={payload}></input>
    case 'text':
      return <strong>{payload}</strong>;
    case 'dropdown':
      return (<select>
              <option value="Good for Day">Good for Day</option>
              <option value="Good till Canceled">Good till Canceled</option>
            </select>);
    default:
      return 'dunno lol'
  }
}

const Options = (props) => (
  <div className="list-container">
    <div className="box-left">{props.label}</div>
    <div className="box-right">{renderSwitch(props.type, props.payload, props.dataKey)}</div>
  </div>
);

export default Options;