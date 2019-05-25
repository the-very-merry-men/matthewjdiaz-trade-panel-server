import React from 'react';
import "isomorphic-fetch";
import TradePanel from '../client/src/components/TradePanel.jsx';
import { shallow, render, mount } from 'enzyme';

describe('Trade panel behavior', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<TradePanel/>);
    expect(wrapper.length).toEqual(1);
  });

  it('should show the ticker for the current stock', () => {
    const wrapper = shallow(<TradePanel/>);
    let stock = 'GOOG';
    wrapper.setState({ stock }, () => {
      const text = wrapper.find('h3').text();
      expect(text).toBe(`Buy ${stock.toUpperCase()}`);
    });
  });

  it('should toggle menu upon clicking the menu button', () => {
    const wrapper = shallow(<TradePanel/>);
    const menuBtn = wrapper.find('#menu');

    // Toggle menu on
    menuBtn.simulate('click');
    expect(wrapper.state().showOrderTypes).toBe(true);
    expect(wrapper.find('OrderTypes').exists()).toBe(true);

    // Toggle menu off
    menuBtn.simulate('click');
    expect(wrapper.state().showOrderTypes).toBe(false);
    expect(wrapper.find('OrderTypes').exists()).toBe(false);
  });

  it('should show market order option by default on load', () => {
    const wrapper = shallow(<TradePanel/>);
    let currType = wrapper.state().currType;
    expect(currType).toEqual(0);
    expect(wrapper.state().orderStructure[currType].type).toBe('Market Order');
  });

  it.todo('should update the price upon changing quantity of shares', () => {
    const wrapper = shallow(<TradePanel/>);
    wrapper.find('input[data-key=\"Shares\"]').simulate('change', { target: { value: '2' }});

  });
  it.todo('should render limit price input after changing order type to Limit Order');
  it.todo('should render stop price input after changing order type to Stop Loss Order');
  it.todo('should render stop price AND limit price inputs after changing order type to Stop Limit Order');
  it.todo('should update commissions field dynamically upon changing share quantity');
  it.todo('should retain value for stock quantity upon changing order type');
  it.todo('should toggle menu off when clicked elsewhere');
  it.todo('should not accept non-numeric characters');
  it.todo('should accept decimal characters for stop and limit price');
  it.todo('should turn red upon submitting decimal value for share quantity');
  it.todo('should close menu upon clicking anywhere outside the menu');
});