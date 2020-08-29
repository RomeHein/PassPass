const Pool = require('../../model/PoolModel')
const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('quit')
    .invoke((ctx) => ctx.sendMessage('quit.confirm'))
    .keyboard([
        [{ 'keyboard.quit.confirm.true': 1}],
        [{ 'keyboard.quit.confirm.false': 0}]
    ])
    .answer((ctx) => {
        if (ctx.answer) {
            const user = await User.findByTelegramId(ctx.meta.user.id)
            await user.remove()
            return ctx.sendMessage('quit.done')
        }
        return ctx.sendMessage('quit.cancel')
    })
}