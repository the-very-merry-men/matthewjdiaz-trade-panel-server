import React, { Component } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  height: auto;
  width: inherit;
  top: 22px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 1px solid ${props => props.theme.accent};
  border-top: 0px;
  background-color: white;
  text-align: left;

  > li {
    padding: 0 10px;
    font-size: 14px;
    margin: 0;
  }
`;

const Item = styled.li`
  background: ${props => props.highlighted ? props.theme.main : ''};
  color: ${props => props. highlighted ? 'white' : ''};
`;
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
      <List theme={this.props.theme} ref={node => this.node = node}>
        {this.props.values.map((value, index) => <Item theme={this.props.theme} highlighted={this.props.highlighted === index} key={index} onMouseOver={() => this.props.highlight(index)} onClick={() => this.props.handleClick(index)}>{value}</Item>)}
      </List>
    );
  }
}  

export default Values;