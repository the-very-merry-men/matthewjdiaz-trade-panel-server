import React from 'react';
import "isomorphic-fetch";
import TradePanel from '../client/src/components/TradePanel.jsx';
import { shallow, render, mount } from 'enzyme';

describe('Trade panel behavior', () => {
  it('should show results for the current stock', () => {
    const wrapper = shallow(<TradePanel/>);
  })
})