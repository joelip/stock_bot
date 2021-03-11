const { chromium } = require('playwright');
const SendSlackMessage = require('./slack');
const elgatoConfig = require('./site_configs').elgatoRingLight;

module.exports = async function () {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(elgatoConfig.url);
  await page.waitForSelector(elgatoConfig.selectors.stockAvailabilityContainer);
  const currentAvailabilityStatus = await page.$eval(
    elgatoConfig.selectors.stockAvailabilityContainer,
    (node) => {
      return node.innerText;
    }
  );
  console.log(
    `${
      elgatoConfig.itemName
    } status as of ${new Date()} —— ${currentAvailabilityStatus}`
  );
  if (
    elgatoConfig.hasSentMessage === false &&
    currentAvailabilityStatus !== elgatoConfig.outOfStockString
  ) {
    console.log('Would have sent a message');
    await SendSlackMessage(
      elgatoConfig.changedMessage(),
      elgatoConfig.channelName
    );
    elgatoConfig.hasSentMessage = true;
  }
  await browser.close();
};
