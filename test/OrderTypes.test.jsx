import React from 'react';
import OrderTypes from '../client/src/components/OrderTypes.jsx';
import { shallow, render, mount } from 'enzyme';

describe('Order types panel behavior', () => {
  it('should toggle menu off upon clicking anywhere outside the menu', () => {
    let eventHandlers = {};

    // Mock document event listener
    document.addEventListener = jest.fn((event, handler) => {
      eventHandlers[event] = handler;
    });

    // Spy on function
    const outsideClickSpy = jest.spyOn(OrderTypes.prototype, 'handleOutsideClick');
    const wrapper = shallow(<OrderTypes/>);

    // Click outside
    eventHandlers.click({ target: 'outside' });

    expect(outsideClickSpy).toHaveBeenCalled();
  });
})