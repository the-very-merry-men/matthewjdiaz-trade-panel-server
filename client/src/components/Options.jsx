import React from 'react';

const renderSwitch = (type, payload) => {
  switch(type) {
    case 'input':
      return <input type="text" id="input-lg" defaultValue={payload} placeholder={payload}></input>
    case 'text':
      return <strong>{payload}</strong>;
    default:
      return 'dunno lol'
  }
}

const Options = (props) => (
  <div className="list-container">
    <div className="box-left">{props.label}</div>
    <div className="box-right">{renderSwitch(props.type, props.payload)}</div>
  </div>
);

export default Options;