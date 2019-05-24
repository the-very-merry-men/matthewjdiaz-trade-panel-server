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
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  showDropdown() {
    this.setState(state => ({ showDropdown: !state.showDropdown }));
    const target = `#dd[data-id=\"expiration\"]`;
    $(target).toggleClass('dd-activated');
  }

  handleOutsideClick(e) {
    if (!this.node || !this.node.contains(e.target)) {
      this.setState({ showDropdown: false });
      const target = `#dd[data-id=\"expiration\"]`;
      $(target).toggleClass('dd-activated');
    }
  }

  handleClick(selected) {
    this.setState({ selected, showDropdown: false });
  }

  highlight(index) {
    this.setState({ highlighted: index });
  }

  render() {
    return (
      <div id="dd-container" ref={node => this.node = node}>
        {this.state.showDropdown ? <Values highlighted={this.state.highlighted} highlight={this.highlight.bind(this)} selected={this.state.selected} values={this.props.values} handleClick={this.handleClick.bind(this)}/> : null}
        <div id="dd" data-id="expiration" onClick={this.showDropdown.bind(this)}>
        {this.props.values[this.state.selected]}
        </div>
      </div>
    );
  }
}

export default Select;