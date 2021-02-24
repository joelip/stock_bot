const { chromium } = require('playwright');
const cron = require('node-cron');
const SendSlackMessage = require('./src/slack');

var hasSentMessage = false;

const run = async function () {
  const TOP_SHOT_PACK_LENGTH = 8;
  const TOP_SHOT_URL = 'https://www.nbatopshot.com/packs';
  const TOP_SHOT_PACKS_SELECTOR = "[alt='Pack Sold Out']";
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(TOP_SHOT_URL);
  await page.waitForSelector(TOP_SHOT_PACKS_SELECTOR);
  const $packImageElms = await page.$$(TOP_SHOT_PACKS_SELECTOR);
  const numberOfPackSoldOutImages = $packImageElms.length;
  console.log(`Found ${numberOfPackSoldOutImages} images`);
  if (
    numberOfPackSoldOutImages !== TOP_SHOT_PACK_LENGTH &&
    hasSentMessage === false
  ) {
    await SendSlackMessage(
      `The number of "sold out" packs is no longer at max. Check ${TOP_SHOT_URL}.`
    );
    hasSentMessage = true;
  }
  await browser.close();
};

cron.schedule('*/10 * * * * *', run);
