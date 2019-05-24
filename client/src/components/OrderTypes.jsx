import React, { Component } from 'react';
import $ from 'jquery';

class OrderTypes extends Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick(e) {
    if (!this.node || !this.node.contains(e.target)) {
      $('#order-types').fadeOut('fast', () => this.props.showOrderTypes());
    }
  }

  render() {
    return (
      <div id="order-types" ref={node => this.node = node}>
        <div className="header">
          <div id="header-left"><h3>Order Type</h3></div>
        </div>
        <ul>
          {this.props.orderStructure.map((structure, index) => <li key={index} className={this.props.currType === index ? 'active-left' : ''}><strong><a href="#" onClick={() => {
            this.props.changeType(index);
            $('#order-types').fadeOut('fast', () => this.props.showOrderTypes());
            }}>{structure.type}</a></strong></li>)}
        </ul>
      </div>
    );
  }

}

export default OrderTypes;