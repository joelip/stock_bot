const { chromium, devices } = require('playwright');
const SendSlackMessage = require('../slack');
const TargetPS5Config = require('../site_configs').targetps5;
const iPhone = devices['iPhone 11 Pro'];

module.exports = async function () {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...iPhone,
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    await page.goto(TargetPS5Config.url);
    await page.waitForSelector(
      TargetPS5Config.selectors.stockAvailabilityContainer
    );
    const currentAvailabilityStatus = await page.$eval(
      TargetPS5Config.selectors.stockAvailabilityContainer,
      (node) => {
        return node.innerText;
      }
    );
    console.log(
      `${
        TargetPS5Config.itemName
      } status as of ${new Date()} —— ${currentAvailabilityStatus}`
    );
    if (
      TargetPS5Config.hasSentMessage === false &&
      currentAvailabilityStatus !== TargetPS5Config.outOfStockString
    ) {
      console.log('Would have sent a message');
      await SendSlackMessage(
        TargetPS5Config.changedMessage(),
        TargetPS5Config.channelName
      );
      TargetPS5Config.hasSentMessage = true;
    }
    await browser.close();
  } catch (error) {
    console.log(
      `Encountered error at ${new Date()} running check: ${error.message}`
    );
  }
};
