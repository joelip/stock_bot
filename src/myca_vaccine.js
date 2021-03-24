const { firefox } = require('playwright');
const SendSlackMessage = require('./slack');

module.exports = async function () {
  const Selectors = {
    themeContainer: '.themeLayoutStarterWrapper',
    radioInput: 'input',
  };
  const browser = await firefox.launch({ headless: false });
  const page = await browser.newPage();
  const currentContext = browser.contexts()[0];
  await currentContext.grantPermissions(['geolocation']);
  await currentContext.setGeolocation({
    latitude: 37.862161,
    longitude: -122.283325,
  });
  await page.goto('https://myturnvolunteer.ca.gov/s/schedule/#search');
  await page.waitForSelector(Selectors.themeContainer);
  const $themeContainer = await page.$(Selectors.themeContainer);
  const themeHTML = await $themeContainer.innerHTML();
  const $supportRadio = await $themeContainer.$$(Selectors.radioInput);
  const supportHTML = await $supportRadio[0].innerHTML();
  // await $supportRadio.check();
  // const checked = $supportRadio.isChecked();
  // console.log(`Checked: ${checked}`);
  // // debugger;
  // await contentFrame.check(Selectors.radioInput);
  // await $supportRadio.click();
  // console.log(themeHTML);
  console.log(supportHTML);
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
  await browser.close();
};
