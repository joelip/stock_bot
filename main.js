const cron = require('node-cron');
const RoguePlatesCrawlFn = require('./src/rogue');
const ElgatoCrawlFn = require('./src/elgato');
const myCAVaccineFn = require('./src/myca_vaccine');

const run = async function () {
  // RoguePlatesCrawlFn();
  // ElgatoCrawlFn();
  myCAVaccineFn();
};
run();

// cron.schedule('*/30 * * * * *', run);
