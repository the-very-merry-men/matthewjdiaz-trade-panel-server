import React from 'react';
import 'isomorphic-fetch';
import TradePanel from '../client/src/components/TradePanel.jsx';
import { shallow, render, mount } from 'enzyme';

// Create a mock response
let mockResponse = {
  json: () => Promise.resolve([{ price: 10 }])
};

// Overwrite the fetch in the global object with a mock
global.fetch = jest.fn(() => Promise.resolve(mockResponse));

describe('Trade panel behavior', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<TradePanel />);
    expect(wrapper.length).toEqual(1);
  });

  it('should show the ticker for the current stock', () => {
    const wrapper = shallow(<TradePanel />);
    let stock = 'GOOG';
    wrapper.setState({ stock }, () => {
      const text = wrapper.find('h3').text();
      expect(text).toBe(`Buy ${stock.toUpperCase()}`);
    });
  });

  it('should toggle menu upon clicking the menu button', () => {
    const wrapper = shallow(<TradePanel />);
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
    const wrapper = shallow(<TradePanel />);
    let currType = wrapper.state().currType;
    expect(currType).toEqual(0);
    expect(wrapper.state().orderStructure[currType].type).toBe('Market Order');
  });

  it('should update the estimated cost upon changing quantity of shares', async done => {
    const wrapper = await mount(<TradePanel />);
    await wrapper.instance().fetchData();

    // Must be a string
    const shares = '2';

    // Change amount of shares
    wrapper.find(`[data-key="Shares"]`).simulate('change', { target: { value: shares }});

    // Compare the updated cost
    const estimatedCost = wrapper.find('strong[data-key="Estimated Cost"]').text();
    mockResponse.json().then(response => {
      const match = estimatedCost.match(/\$(\d+.\d+)/i) ;
      const extracted = match ? +match[1] : null;
      expect(extracted).toBe(shares * response[0].price);
      done();
    });
  });

  it('should render limit price input after changing order type to Limit Order', () => {
    const wrapper = mount(<TradePanel/>);
    
    // Open the menu
    wrapper.find('#menu').simulate('click');

    // Find 2nd option
    const limitOrderOption = wrapper.find('#order-types ul').children().at(1).find('a');
    expect(limitOrderOption.text()).toBe('Limit Order');

    // Click the limit order
    limitOrderOption.simulate('click');

    const limitPriceInput = wrapper.find('input[data-key="Limit Price"]');
    expect(limitPriceInput.length).toBe(1);
  });
  it('should render stop price input after changing order type to Stop Loss Order', () => {
    const wrapper = mount(<TradePanel/>);
    
    // Open the menu
    wrapper.find('#menu').simulate('click');

    // Find 2nd option
    const stopLossOrderOption = wrapper.find('#order-types ul').children().at(2).find('a');
    expect(stopLossOrderOption.text()).toBe('Stop Loss Order');

    // Click the limit order
    stopLossOrderOption.simulate('click');

    const stopPriceInput = wrapper.find('input[data-key="Stop Price"]');
    expect(stopPriceInput.length).toBe(1);
  });
  it('should render stop price AND limit price inputs after changing order type to Stop Limit Order', () => {
    const wrapper = mount(<TradePanel/>);
    
    // Open the menu
    wrapper.find('#menu').simulate('click');

    // Find 2nd option
    const stopLimitOrderOption = wrapper.find('#order-types ul').children().at(3).find('a');
    expect(stopLimitOrderOption.text()).toBe('Stop Limit Order');

    // Click the limit order
    stopLimitOrderOption.simulate('click');

    const stopPriceInput = wrapper.find('input[data-key="Stop Price"]');
    expect(stopPriceInput.length).toBe(1);

    const limitPriceInput = wrapper.find('input[data-key="Limit Price"]');
    expect(limitPriceInput.length).toBe(1);
  });
  it('should retain value for stock quantity upon changing order type', async done => {
    const wrapper = await mount(<TradePanel />);
    await wrapper.instance().fetchData();

    // Must be a string
    const shares = '2';

    // Change amount of shares
    const sharesInputInitial = wrapper.find(`[data-key="Shares"]`);
    sharesInputInitial.simulate('change', { target: { value: shares }});
    console.log(sharesInputInitial.at(0).instance().value)

    // Open the menu
    wrapper.find('#menu').simulate('click');

    // Find 2nd option
    const stopLimitOrderOption = wrapper.find('#order-types ul').children().at(3).find('a');
    expect(stopLimitOrderOption.text()).toBe('Stop Limit Order');

    // Click the limit order
    stopLimitOrderOption.simulate('click');

    const sharesInputLatter = wrapper.find(`[data-key="Shares"]`);
    // expect(sharesInputLatter.props().value).toBe(shares);

  });
  it.todo('should toggle menu off when clicked elsewhere');
  it.todo('should not accept non-numeric characters');
  it.todo('should accept decimal characters for stop and limit price');
  it.todo('should turn red upon submitting decimal value for share quantity');
  it.todo('should close menu upon clicking anywhere outside the menu');
});