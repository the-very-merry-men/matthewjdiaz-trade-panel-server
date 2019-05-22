import React from 'react';
import $ from 'jquery';

const OrderTypes = (props) => (
  <div id="order-types">
    <div className="header">
      <div id="header-left"><h3>Order Type</h3></div>
    </div>
    <ul>
      {props.orderTypes.map((type, index) => <li key={index} className={props.currType === index ? 'active-left' : ''}><strong><a href="#" onClick={() => {
        props.changeType(index);
        $('#order-types').fadeOut('fast', () => props.showOrderTypes());
        }}>{type}</a></strong></li>)}
    </ul>
  </div>
);

export default OrderTypes;