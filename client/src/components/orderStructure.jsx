class Input {
  constructor(label, type = 'input') {
    this.label = label;
    this.type = type;
  }
}

class Structure {
  constructor(type, ...options) {
    this.type = type;
    this.options = [...options];
  }
}

const shares = new Input('Shares');
const marketPrice = new Input('Market Price', 'text');
const limitPrice = new Input('Limit Price');
const expiration = new Input('Expiration', 'dropdown');
const stopPrice = new Input('Stop Price');

const structure = [
  new Structure('Market Order', shares, marketPrice),
  new Structure('Limit Order', limitPrice, shares, expiration),
  new Structure('Stop Loss Order', stopPrice, shares, expiration),
  new Structure('Stop Limit Order', stopPrice, limitPrice, shares, expiration)
];

export default structure;