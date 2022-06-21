const PlaystationSitePS5Fn = require('./crawlers/playstationsiteps5.js');
const TargetPS5Fn = require('./crawlers/targetps5.js');
const BestBuyPS5DigitalFn = require('./crawlers/bestbuyps5digital.js');
const BestBuyPS5DiscFn = require('./crawlers/bestbuyps5disc.js');

const run = async function () {
  PlaystationSitePS5Fn();
  TargetPS5Fn();
  BestBuyPS5DiscFn();
  BestBuyPS5DigitalFn();
};

run();
