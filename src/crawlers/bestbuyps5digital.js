const { chromium, devices } = require('playwright');
const SendSlackMessage = require('../slack');
const BestBuyPS5DigitalConfig = require('../site_configs').bestbuyps5digital;
const iPhone = devices['iPhone 11 Pro'];

module.exports = async function () {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...iPhone,
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    await page.goto(BestBuyPS5DigitalConfig.url);
    await page.waitForSelector(
      BestBuyPS5DigitalConfig.selectors.stockAvailabilityContainer
    );
    const currentAvailabilityStatus = await page.$eval(
      BestBuyPS5DigitalConfig.selectors.stockAvailabilityContainer,
      (node) => {
        return node.innerText;
      }
    );
    console.log(
      `${
        BestBuyPS5DigitalConfig.itemName
      } status as of ${new Date()} —— ${currentAvailabilityStatus}`
    );
    if (
      BestBuyPS5DigitalConfig.hasSentMessage === false &&
      currentAvailabilityStatus !== BestBuyPS5DigitalConfig.outOfStockString
    ) {
      console.log('Would have sent a message');
      await SendSlackMessage(
        BestBuyPS5DigitalConfig.changedMessage(),
        BestBuyPS5DigitalConfig.channelName
      );
      BestBuyPS5DigitalConfig.hasSentMessage = true;
    }
    await browser.close();
  } catch (error) {
    console.log(
      `Encountered error at ${new Date()} running check: ${error.message}`
    );
  }
};
