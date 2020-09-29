require('dotenv').config();
const { WebClient } = require('@slack/web-api');

(async () => {
  const token = process.env.SLACK_TOKEN;
  const web = new WebClient(token);
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({
    channel: '#rogue',
    text: 'testing',
  });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();
