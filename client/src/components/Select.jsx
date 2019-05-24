import React, { Component } from 'react';
import Values from './Values.jsx';
import $ from 'jquery';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
  }

  showDropdown() {
    this.setState(state => ({ showDropdown: !state.showDropdown }));
    const target = `#input-lg[data-id=\"expiration\"]`;
    $(target).toggleClass('dd-activated')
  }

  render() {
    return (
      <div id="dd-container">
        {this.state.showDropdown ? <Values values={this.props.values}/> : null}
        <div id="input-lg" data-id="expiration" onClick={this.showDropdown.bind(this)}>
        </div>
      </div>
    );
  }
}

export default Select;