import React, { Component } from 'react';
import OrderTypes from './OrderTypes.jsx';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: 'inst',
      data: [],
      orderTypes: ['Market Order', 'Limit Order', 'Stop Loss Order', 'Stop Limit Order'],
      showOrderTypes: false,
      currType: 0
    };

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
    fetch(`/api/stocks/${this.state.stock}/price`)
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

  render() {
    return (
      <div>
        {this.state.showOrderTypes ? <OrderTypes orderTypes={this.state.orderTypes} currType={this.state.currType} changeType={this.changeType.bind(this)} showOrderTypes={this.showOrderTypes.bind(this)}/> : null}
        <div className='header'>
          <div id='header-left'>
            <h3>Buy {this.state.stock.toUpperCase()}</h3>
          </div>
          <div id='header-right' className={this.state.showOrderTypes ? 'active-bottom' : ''}>
            <svg width='28' height='28' onClick={this.showOrderTypes.bind(this)}>
              <path fillRule="evenodd" d="M14,16 C12.8954305,16 12,15.1045695 12,14 C12,12.8954305 12.8954305,12 14,12 C15.1045695,12 16,12.8954305 16,14 C16,15.1045695 15.1045695,16 14,16 Z M6,16 C4.8954305,16 4,15.1045695 4,14 C4,12.8954305 4.8954305,12 6,12 C7.1045695,12 8,12.8954305 8,14 C8,15.1045695 7.1045695,16 6,16 Z M22,16 C20.8954305,16 20,15.1045695 20,14 C20,12.8954305 20.8954305,12 22,12 C23.1045695,12 24,12.8954305 24,14 C24,15.1045695 23.1045695,16 22,16 Z"></path>
            </svg>
          </div>
        </div>
        <div className='main-container'>
          <div className="list-container">
            <div className="box-left">Commissions</div>
            <div className="box-right">$0.00</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;