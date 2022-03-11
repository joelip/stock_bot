const cron = require('node-cron');
const TargetPS5Fn = require('./src/targetps5.js')
const BestBuyPS5DigitalFn = require('./src/bestbuyps5digital.js')
const BestBuyPS5DiscFn = require('./src/bestbuyps5disc.js')

const run = async function () {
  TargetPS5Fn();
  BestBuyPS5DiscFn();
  BestBuyPS5DigitalFn();
};

cron.schedule('*/10 * * * * *', run);
