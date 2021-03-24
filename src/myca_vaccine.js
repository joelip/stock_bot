const got = require('got');
const SendSlackMessage = require('./slack');

module.exports = async function () {
  var hasSentMessage = false;
  const SEARCH_URL = 'https://myturnvolunteer.ca.gov/s/schedule#search';
  const POST_URL =
    'https://myturnvolunteer.ca.gov/s/sfsites/aura?r=11&aura.ApexAction.execute=1';
  const cookieString =
    'renderCtx=%7B%22pageId%22%3A%224d72295e-92a7-4b09-9a8d-fe789ec4b457%22%2C%22schema%22%3A%22Published%22%2C%22viewType%22%3A%22Published%22%2C%22brandingSetId%22%3A%22f5c37b15-72c4-4421-af84-37960d2fa7e0%22%2C%22audienceIds%22%3A%22%22%7D; CookieConsentPolicy=0:0; pctrk=848b7b91-8d91-414b-a904-edb03f90a9ee; _abck=5E99C2D03C4AA8B0EC3B0DD4E4F89E30~0~YAAQ3OkyFz9JG0x4AQAAnH8LTQXdRbbFS8cuXUZq41mCSjw3ed08PSXoXlmvDO3pmA82vHjnkfPi27AkuBoNcXTT4GbcZUnFUH9GeqbuboPRCe7IOvzr22asMfG7/L0SNNKdBLH6/sqPVjiW9npe3m5m2V2iPSDY+D7EHb49yf/45uTvtZ2oYv3bsZjYgCMwBZsSqtPbVvKsbJHTmlGm1HHvs+xwiDilYOM8b1tOcD5bDrn6TmDKKpvn9gXZqJNMXjU4w6Fg67GLPY83jnw2ODHLe7yLRKI1BTR3qt8RVYMdA5eVu4po+vmHwFf6cPDPtWAeC9wLEu5Xrra+bTQAg5kuzXJ9B811uPv1d1nZAHVFCtlAfTCaGG9AeqWbSHcwcB/eFusHya/OMJ7jlF4tTHIyNRg=~-1~||-1||~-1';
  const searchParams =
    'message=%7B%22actions%22%3A%5B%7B%22id%22%3A%22193%3Ba%22%2C%22descriptor%22%3A%22aura%3A%2F%2FApexActionController%2FACTION%24execute%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22namespace%22%3A%22skedvm%22%2C%22classname%22%3A%22LocationController%22%2C%22method%22%3A%22getLocationsByTags%22%2C%22params%22%3A%7B%22type%22%3A%22General%20Support%22%2C%22tags%22%3A%5B%22a3It00000001ocOEAQ%22%2C%22a3It00000001ocYEAQ%22%5D%2C%22lat%22%3A37.8680576%2C%22lon%22%3A-122.2852374%2C%22max%22%3A50%7D%2C%22cacheable%22%3Afalse%2C%22isContinuation%22%3Afalse%7D%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22Q8onN6EmJyGRC51_NSPc2A%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%224cm95xKNoonR9yZ2JR2osw%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%7D%2C%22uad%22%3Afalse%7D&aura.pageURI=%2Fs%2Fschedule%23search&aura.token=undefined';
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'sec-ch-ua':
      '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-sfdc-page-scope-id': 'f3f74fb7-d5e2-4ceb-b6dc-7cf5cc487944',
    'x-sfdc-request-id': '152385424290000356',
    referrer: 'https://myturnvolunteer.ca.gov/s/schedule',
    referrerPolicy: 'origin-when-cross-origin',
    cookie: cookieString,
  };
  const response = await got.post(POST_URL, { headers, searchParams });

  if (
    JSON.parse(response.body)['actions'][0]['returnValue']['returnValue'] !==
      '[]' &&
    hasSentMessage === true
  ) {
    await SendSlackMessage(
      `The number of vaccine volunteering opportunities changed. ${SEARCH_URL}.`,
      '#vaccine-appts'
    );
    hasSentMessage = true;
    return;
  }

  console.log('Checked vaccine appointments with no results.');
};
