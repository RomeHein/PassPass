const bb = require('bot-brother');
const bot = bb({
  key: '<_TELEGRAM_BOT_TOKEN>',
  sessionManager: bb.sessionManager.memory(),
  polling: { interval: 0, timeout: 1 }
});