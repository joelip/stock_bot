const { chromium } = require("playwright");
const { writeFileSync } = require('fs');

const SITE_URL = "https://www.us-proxy.org/";
const PROXY_BUTTON_SELECTOR = '[title="Get raw list"]';
const MODAL_PROXY_LIST_SELECTOR = '.modal-body textarea.form-control';
const PROXY_FILE_PATH = `${process.cwd()}/tmp/proxies.json`;

const run = async function () {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(SITE_URL);
  await page.waitForSelector(PROXY_BUTTON_SELECTOR);
  await page.click(PROXY_BUTTON_SELECTOR);
  const proxyListText = await page.inputValue(MODAL_PROXY_LIST_SELECTOR);
  await browser.close();
  const proxyListTextArray = proxyListText.split('\n');
  const proxyArray = proxyListTextArray.slice(3);
  console.log(`Founds ${proxyArray.length} proxies. Writing to file.`)
  // if (proxyArray.length) {
  writeFileSync(PROXY_FILE_PATH, JSON.stringify(proxyArray))
  // }
};

run();
