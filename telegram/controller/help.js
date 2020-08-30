const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('help')
    .invoke((ctx) => ctx.sendMessage('help.info'))

    bot.command('info')
    .use((ctx)=>ctx.sendMessage('info'))
    .invoke(async (ctx) => {
        const user = User.findByTelegramId(ctx.meta.user.id)
        return ctx.sendMessage(JSON.stringify(user))
    })

}