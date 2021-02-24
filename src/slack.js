require('dotenv').config();
const { WebClient } = require('@slack/web-api');

module.exports = async function (message = 'Testing') {
  const token = process.env.SLACK_TOKEN;
  const web = new WebClient(token);
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({
    channel: '#nba-top-shot',
    text: message,
  });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
};
