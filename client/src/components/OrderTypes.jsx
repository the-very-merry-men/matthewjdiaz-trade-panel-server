import React, { Component } from 'react';
import orderStructure from './orderStructure.jsx';
import $ from 'jquery';
import PropTypes from 'prop-types';

class OrderTypes extends Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
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

OrderTypes.propTypes = {
  orderStructure: PropTypes.array,
  currType: PropTypes.number,
  changeType: PropTypes.func,
  showOrderTypes: PropTypes.func
}

OrderTypes.defaultProps = {
  orderStructure,
  currType: 0,
  changeType: () => {},
  showOrderTypes: () => {}
}


export default OrderTypes;