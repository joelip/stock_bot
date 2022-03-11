const cron = require('node-cron');
const BestBuyPS5DiscFn = require('./src/bestbuyps5disc.js')

const run = async function () {
  BestBuyPS5DiscFn();
};

cron.schedule('*/10 * * * * *', run);
