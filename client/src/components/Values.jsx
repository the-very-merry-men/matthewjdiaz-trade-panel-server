import React, { Component } from 'react';

class Values extends Component {
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
      this.props.showDropdown();
    }
  }

  render() {
    return (
      <ul id="values" ref={node => this.node = node}>
        {this.props.values.map((value, index) => <li className={this.props.highlighted === index ? 'highlighted' : ''} key={index} onMouseOver={() => this.props.highlight(index)} onClick={() => this.props.handleClick(index)}>{value}</li>)}
      </ul>
    );
  }
}  

export default Values;