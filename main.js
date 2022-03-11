const cron = require('node-cron');
const BestBuyPS5DigitalFn = require('./src/bestbuyps5digital.js')
const BestBuyPS5DiscFn = require('./src/bestbuyps5disc.js')

const run = async function () {
  BestBuyPS5DiscFn();
  BestBuyPS5DigitalFn();
};

cron.schedule('*/10 * * * * *', run);
