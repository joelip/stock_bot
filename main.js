const cron = require('node-cron');
const PlaystationSitePS5Fn = require('./src/playstationsiteps5.js');
const TargetPS5Fn = require('./src/targetps5.js');
const BestBuyPS5DigitalFn = require('./src/bestbuyps5digital.js');
const BestBuyPS5DiscFn = require('./src/bestbuyps5disc.js');

const run = async function () {
  PlaystationSitePS5Fn();
  TargetPS5Fn();
  BestBuyPS5DiscFn();
  BestBuyPS5DigitalFn();
};

cron.schedule('*/10 * * * * *', run);
