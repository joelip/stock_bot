const TargetPS5Fn = require('./targetps5.js')
const BestBuyPS5DigitalFn = require('./bestbuyps5digital.js')
const BestBuyPS5DiscFn = require('./bestbuyps5disc.js')

const run = async function () {
  TargetPS5Fn();
  BestBuyPS5DiscFn();
  BestBuyPS5DigitalFn();
};

run();
