---
to: src/crawlers/<%= h.inflection.underscore(h.changeCase.lower(name)) %>.js
---
const { chromium, devices } = require('playwright');
const SendSlackMessage = require('./slack');
const <%= name %>Config = require('./site_configs').<%= h.inflection.underscore(h.changeCase.lower(name)) %>;
const iPhone = devices['iPhone 11 Pro'];

module.exports = async function () {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...iPhone,
      javaScriptEnabled: false
    });
    const page = await context.newPage();
    await page.goto(<%= name %>Config.url);
    await page.waitForSelector(<%= name %>Config.selectors.stockAvailabilityContainer);
    const currentAvailabilityStatus = await page.$eval(
      <%= name %>Config.selectors.stockAvailabilityContainer,
      (node) => {
        return node.innerText;
      }
    );
    console.log(
      `${
        <%= name %>Config.itemName
      } status as of ${new Date()} —— ${currentAvailabilityStatus}`
    );
    if (
      <%= name %>Config.hasSentMessage === false &&
      currentAvailabilityStatus !== <%= name %>Config.outOfStockString
    ) {
      console.log('Would have sent a message');
      await SendSlackMessage(
        <%= name %>Config.changedMessage(),
        <%= name %>Config.channelName
      );
      <%= name %>Config.hasSentMessage = true;
    }
    await browser.close();
  } catch (error) {
    console.log(`Encountered error at ${new Date()} running check: ${error.message}`)
  }
};
