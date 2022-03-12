const { chromium, devices } = require('playwright');
const SendSlackMessage = require('./slack');
const PlaystationSitePS5Config = require('./site_configs').playstationsiteps5;
const iPhone = devices['iPhone 11 Pro'];

module.exports = async function () {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(PlaystationSitePS5Config.url);
    await page.waitForSelector(PlaystationSitePS5Config.selectors.stockAvailabilityContainer);
    const currentAvailabilityStatus = await page.$eval(
      PlaystationSitePS5Config.selectors.stockAvailabilityContainer,
      (node) => {
        return node.innerText;
      }
    );
    console.log(
      `${
        PlaystationSitePS5Config.itemName
      } status as of ${new Date()} —— ${currentAvailabilityStatus}`
    );
    if (
      PlaystationSitePS5Config.hasSentMessage === false &&
      currentAvailabilityStatus !== PlaystationSitePS5Config.outOfStockString
    ) {
      console.log('Would have sent a message');
      await SendSlackMessage(
        PlaystationSitePS5Config.changedMessage(),
        PlaystationSitePS5Config.channelName
      );
      PlaystationSitePS5Config.hasSentMessage = true;
    }
    await browser.close();
  } catch (error) {
    console.log(`Encountered error at ${new Date()} running check: ${error.message}`)
  }
};

