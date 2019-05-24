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
  }

  componentDidMount() {
    console.log(this.state.orderStructure);
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

  render() {
    return (
      <div>
        {this.state.showOrderTypes ? <OrderTypes orderStructure={this.state.orderStructure} currType={this.state.currType} changeType={this.changeType.bind(this)} showOrderTypes={this.showOrderTypes.bind(this)}/> : null}
        <div className='header'>
          <div id='header-left'>
            <h3>Buy {this.state.stock.toUpperCase()}</h3>
          </div>
          <div id='header-right' className={this.state.showOrderTypes ? 'active-bottom' : ''}>
            <svg id='menu' className={this.state.showOrderTypes ? 'active' : ''} width='28' height='28' onClick={this.showOrderTypes.bind(this)}>
              <Icon/>
            </svg>
          </div>
        </div>
        <div className='main-container'>
          {this.state.orderStructure[this.state.currType].options.map(input => <Options key={input.label} dataKey={input.label} label={input.label} type={input.type} payload={this.payloadSwitch(input.label)}/>)}
          <hr></hr>
          <Options label={<strong>{"Estimated Cost"}</strong>} type="text" payload={`$${this.state.cost}`}/>
          <button id="review-order" href="#">Review Order</button>
        </div>
      </div>
    );
  }
}

export default TradePanel;