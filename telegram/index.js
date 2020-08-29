const bb = require('bot-brother');
const bot = bb({
  key: process.env.telegramToken,
  sessionManager: bb.sessionManager.memory({dir: './storage'}),
  polling: { interval: 0, timeout: 1 }
});
const localization = require('../locales')

// Setting keys and values for locale 'fr'.
bot.texts(localization.fr, {locale: 'fr'})
// Setting default localization values
bot.texts(localization.fr)

bot.use('before', (ctx) => {
  ctx.session.locale = ctx.session.locale || 'en';
  ctx.setLocale(ctx.session.locale);
})

// Set Telegram Notifier as global, so that we can access telegram API everywhere
const Notificator = require('./Notificator');
global.TelegramNotifier = new Notificator(bot)
require('./controller/task')(bot)

require('./controller/start')(bot)
require('./controller/signIn')(bot)
require('./controller/address')(bot)
require('./controller/qrCode')(bot)
require('./CallbackHandler')(bot)
require('./controller/quit')(bot)
