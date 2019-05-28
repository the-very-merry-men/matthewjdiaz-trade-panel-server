import React, { Component } from 'react';
import Values from './Values.jsx';
import $ from 'jquery';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      selected: 0,
      highlighted: 0
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.highlight = this.highlight.bind(this);
  }

  showDropdown() {
    this.setState(state => ({ showDropdown: !state.showDropdown }));
    const target = `#dd[data-id=\"expiration\"]`;
    $(target).toggleClass('dd-activated');
  }

  handleClick(selected) {
    this.setState({ selected }, this.showDropdown);
  }

  highlight(index) {
    this.setState({ highlighted: index });
  }

  render() {
    return (
      <div id="dd-container" ref={node => this.node = node}>
        {this.state.showDropdown ? <Values highlighted={this.state.highlighted} highlight={this.highlight} selected={this.state.selected} values={this.props.values} handleClick={this.handleClick} showDropdown={this.showDropdown}/> : null}
        <div id="dd" data-id="expiration" onClick={this.showDropdown}>
        {this.props.values[this.state.selected]}
        </div>
      </div>
    );
  }
}

export default Select;