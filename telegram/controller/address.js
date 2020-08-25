const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('address-country', (ctx) => {
        return ctx.sendMessage('address.country')
    })
    .answer((ctx) => {
        ctx.data.user.country = ctx.answer
        return ctx.go('address-city')
    })

    bot.command('address-city', (ctx) => {
        return ctx.sendMessage('address.city')
    })
    .answer((ctx) => {
        ctx.data.user.city = ctx.answer
        return ctx.go('address-mail')
    })

    bot.command('address-mail', (ctx) => {
        return ctx.sendMessage('address.mail')
    })
    .answer(async (ctx) => {
        ctx.data.user.mailAddress = ctx.answer
        if (ctx.signInStatus === 1) {
            return ctx.go('signInPrmAccount-3')
        }
        await User.update(ctx.data.user)
        return ctx.sendMessage('address.done')
    })
}