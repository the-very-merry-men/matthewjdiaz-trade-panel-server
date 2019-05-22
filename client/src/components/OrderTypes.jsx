import React from 'react';

const OrderTypes = (props) => (
  <div id="order-types">
    <div className="header">
      <div id="header-left"><h3>Order Type</h3></div>
    </div>
    <ul>
      {props.orderTypes.map(type => <li key={type}><strong><a href="#">{type}</a></strong></li>)}
    </ul>
  </div>
);

export default OrderTypes;