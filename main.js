const cron = require('node-cron');
const RoguePlatesCrawlFn = require('./src/rogue');

const run = async function () {
  RoguePlatesCrawlFn();
};

cron.schedule('*/30 * * * * *', run);
