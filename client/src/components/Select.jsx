import React, { Component } from 'react';
import Values from './Values.jsx';
import { Container, Dropdown } from './Styled.jsx';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActivated: false,
      selected: 0,
      highlighted: 0,
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.highlight = this.highlight.bind(this);
  }

  showDropdown() {
    this.setState(state => ({ isActivated: !state.isActivated }));
  }

  handleClick(selected) {
    this.setState({ selected }, this.showDropdown);
  }

  highlight(index) {
    this.setState({ highlighted: index });
  }

  render() {
    return (
      <Container ref={node => this.node = node}>
        {this.state.isActivated && <Values theme={this.props.theme} highlighted={this.state.highlighted} highlight={this.highlight} selected={this.state.selected} values={this.props.values} handleClick={this.handleClick} showDropdown={this.showDropdown}/>}
        <Dropdown theme={this.props.theme} isActivated={this.state.isActivated} data-id="expiration" onClick={this.showDropdown}>
        {this.props.values[this.state.selected]}
        </Dropdown>
      </Container>
    );
  }
}

export default Select;