const { chromium } = require('playwright');
const SendSlackMessage = require('./src/slack');

module.exports = async function () {
  const TOP_SHOT_PACK_LENGTH = 2;
  const TOP_SHOT_URL = 'https://www.nbatopshot.com/packs';
  const SELECTORS = {
    statusLabel: "[class^='StatusLabel__StyledStatusLabel']",
  };
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(TOP_SHOT_URL);
  await page.waitForSelector(SELECTORS.statusLabel);
  const currentDropStatus = await page.$eval(SELECTORS.statusLabel, (node) => {
    return node.innerText;
  });
  console.log(currentDropStatus);
  if (
    numberOfPackSoldOutImages !== TOP_SHOT_PACK_LENGTH &&
    hasSentMessage === false
  ) {
    await SendSlackMessage(
      `The number of "sold out" packs has changed. Check ${TOP_SHOT_URL}.`,
      '#nba-top-shot'
    );
    hasSentMessage = true;
  }
  await browser.close();
};
