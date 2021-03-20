const { chromium } = require('playwright');
const SendSlackMessage = require('./slack');

module.exports = async function () {
  const GENERAL_SUPPORT_SELECTOR =
    '.themeLayoutStarterWrapper label:for(input[value="General Support"])';
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://myturnvolunteer.ca.gov/s/schedule/#search');
  await page.waitForSelector(GENERAL_SUPPORT_SELECTOR);
  const $supportCheckboxLabel = await page.$(GENERAL_SUPPORT_SELECTOR);
  await $supportCheckboxLabel.focus();
  await $supportCheckboxLabel.check();
  const checked = $supportCheckboxLabel.isChecked();
  console.log(`Checked: ${checked}`);
  // debugger;
  await page.check(GENERAL_SUPPORT_SELECTOR);
  // await $supportCheckboxLabel.click();
  console.log($supportCheckboxLabel);
  // const currentAvailabilityStatus = await page.$eval(
  //   roguePlateConfig.selectors.stockAvailabilityContainer,
  //   (node) => {
  //     return node.innerText;
  //   }
  // );
  // console.log(
  //   `${
  //     roguePlateConfig.itemName
  //   } status as of ${new Date()} —— ${currentAvailabilityStatus}`
  // );
  // if (
  //   roguePlateConfig.hasSentMessage === false &&
  //   currentAvailabilityStatus !== roguePlateConfig.outOfStockString
  // ) {
  //   console.log('Would have sent a message');
  //   await SendSlackMessage(
  //     roguePlateConfig.changedMessage(),
  //     roguePlateConfig.channelName
  //   );
  //   roguePlateConfig.hasSentMessage = true;
  // }
  // await browser.close();
};
