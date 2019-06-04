// import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Dropdown = styled.div`
  &:hover {
    background: white;
    border-color: ${props => props.isActivated ? props.theme.accent : '#d6d6d6'};
  }

  text-align: left;
  font-size: 13px;
  background: ${props => props.isActivated ? 'white' : '#fafafa'};
  border: 1px solid ${props => props.isActivated ? props.theme.accent : '#fafafa'};
  border-radius: 4px;
  height: 34px;
  line-height: 34px;
  padding: 0 13px;
  transition: border-color 0.1s ease-in;
  cursor: pointer;
`;