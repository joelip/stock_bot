const { chromium, devices } = require('playwright');
const SendSlackMessage = require('./slack');
const BestBuyPS5DiscConfig = require('./site_configs').bestbuyps5disc;
const iPhone = devices['iPhone 11 Pro'];

module.exports = async function () {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...iPhone,
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    await page.goto(BestBuyPS5DiscConfig.url);
    await page.waitForSelector(
      BestBuyPS5DiscConfig.selectors.stockAvailabilityContainer
    );
    const currentAvailabilityStatus = await page.$eval(
      BestBuyPS5DiscConfig.selectors.stockAvailabilityContainer,
      (node) => {
        return node.innerText;
      }
    );
    console.log(
      `${
        BestBuyPS5DiscConfig.itemName
      } status as of ${new Date()} —— ${currentAvailabilityStatus}`
    );
    if (
      BestBuyPS5DiscConfig.hasSentMessage === false &&
      currentAvailabilityStatus !== BestBuyPS5DiscConfig.outOfStockString
    ) {
      console.log('Would have sent a message');
      await SendSlackMessage(
        BestBuyPS5DiscConfig.changedMessage(),
        BestBuyPS5DiscConfig.channelName
      );
      BestBuyPS5DiscConfig.hasSentMessage = true;
    }
    await browser.close();
  } catch (error) {
    console.log(
      `Encountered error at ${new Date()} running check: ${error.message}`
    );
  }
};
