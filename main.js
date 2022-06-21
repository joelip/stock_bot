const cron = require('node-cron');
const PlaystationSitePS5Fn = require('./src/crawlers/playstationsiteps5.js');
const TargetPS5Fn = require('./src/crawlers/targetps5.js');
const BestBuyPS5DigitalFn = require('./src/crawlers/bestbuyps5digital.js');
const BestBuyPS5DiscFn = require('./src/crawlers/bestbuyps5disc.js');

const run = async function () {
  PlaystationSitePS5Fn();
  TargetPS5Fn();
  BestBuyPS5DiscFn();
  BestBuyPS5DigitalFn();
};

cron.schedule('*/30 * * * * *', run);
