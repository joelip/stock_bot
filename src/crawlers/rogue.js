const { chromium } = require('playwright');
const SendSlackMessage = require('./slack');
const roguePlateConfig = require('./site_configs').roguePlates;

module.exports = async function () {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(roguePlateConfig.url);
  await page.waitForSelector(
    roguePlateConfig.selectors.stockAvailabilityContainer
  );
  const currentAvailabilityStatus = await page.$eval(
    roguePlateConfig.selectors.stockAvailabilityContainer,
    (node) => {
      return node.innerText;
    }
  );
  console.log(
    `${
      roguePlateConfig.itemName
    } status as of ${new Date()} —— ${currentAvailabilityStatus}`
  );
  if (
    roguePlateConfig.hasSentMessage === false &&
    currentAvailabilityStatus !== roguePlateConfig.outOfStockString
  ) {
    console.log('Would have sent a message');
    await SendSlackMessage(
      roguePlateConfig.changedMessage(),
      roguePlateConfig.channelName
    );
    roguePlateConfig.hasSentMessage = true;
  }
  await browser.close();
};
