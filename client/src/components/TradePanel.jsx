import React, { Component } from 'react';
import OrderTypes from './OrderTypes.jsx';
import orderStructure from './orderStructure.jsx';
import Options from './Options.jsx';
import Icon from './Icon.jsx';

class TradePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: 'inst',
      data: [],
      orderStructure,
      showOrderTypes: false,
      currType: 0,
      cost: 0
    };

    this.fetchData = this.fetchData.bind(this);
    this.showOrderTypes = this.showOrderTypes.bind(this);
    this.changeType = this.changeType.bind(this);
    this.payloadSwitch = this.payloadSwitch.bind(this);
    this.changeTotal = this.changeTotal.bind(this); 
  }
  
  componentDidMount() {
    let match = window.location.pathname.match(/\/stocks\/(\w+)/i);
    const stock = match ? match[1] : null;
    if (stock) {
      return this.setState({stock}, () => this.fetchData());
    }
    this.fetchData();
  }

  fetchData() {
    fetch(`http://localhost:3001/api/stocks/${this.state.stock}/price`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
  }
  
  showOrderTypes() {
    this.setState( state => ({ showOrderTypes: !state.showOrderTypes }));
  }

  changeType(currType) {
    this.setState({ currType });
  }

  payloadSwitch(label) {
    const price = this.state.data.length ? `$${this.state.data[0].price}` : null;
    switch(label) {
      case 'Market Price':
      case 'Limit Price':
        return price;
      case 'Stop Price':
        return `$0.00`;
      default:
        return 0;
    }
  }

  changeTotal(shares) {
    const price = this.state.data.length ? this.state.data[0].price : 0;
    this.setState({ cost: (price*shares).toFixed(2) });
  }

  render() {
    const { stock, data, orderStructure, showOrderTypes, currType, cost } = this.state;
  
    return (
      <div className="main-container">
        <div className='header'>
          <div id='header-left'>
            <h3>Buy {stock.toUpperCase()}</h3>
          </div>
          <div id='header-right' className={showOrderTypes ? 'active-bottom' : ''}>
            <svg id='menu' ref={node => this.node = node} className={showOrderTypes ? 'active' : ''} width='28' height='28' onClick={this.showOrderTypes}>
              <Icon/>
            </svg>
          </div>
        </div>
        <div className='main-container'>
          {orderStructure[currType].options.map(input => <Options changeTotal={this.changeTotal} key={input.label} dataKey={input.label} label={input.label} type={input.type} payload={this.payloadSwitch(input.label)}/>)}
          <hr></hr>
          <Options label={<strong>{"Estimated Cost"}</strong>} dataKey="Estimated Cost" type="text" payload={`$${cost}`}/>
          <button id="review-order" href="#">Review Order</button>
        </div>
        {showOrderTypes && <OrderTypes orderStructure={orderStructure} currType={currType} changeType={this.changeType} showOrderTypes={this.showOrderTypes}/>}
      </div>
    );
  }
}

export default TradePanel;