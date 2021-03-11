const cron = require('node-cron');
const RoguePlatesCrawlFn = require('./src/rogue');
const ElgatoCrawlFn = require('./src/elgato');

const run = async function () {
  RoguePlatesCrawlFn();
  ElgatoCrawlFn();
};

cron.schedule('*/30 * * * * *', run);
