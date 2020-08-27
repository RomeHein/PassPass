const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('address-country')
    .invoke((ctx) => ctx.sendMessage('address.country'))
    .answer((ctx) => {
        ctx.session.user.country = ctx.answer
        return ctx.go('address-city')
    })

    bot.command('address-city')
    .invoke((ctx) => ctx.sendMessage('address.city'))
    .answer((ctx) => {
        ctx.session.user.city = ctx.answer
        return ctx.go('address-mail')
    })

    bot.command('address-mail')
    .invoke((ctx) => ctx.sendMessage('address.mail'))
    .answer(async (ctx) => {
        ctx.session.user.mailAddress = ctx.answer
        if (!ctx.session.user.id) {
            return ctx.go('signInPrmAccount-3')
        }
        await User.update(ctx.session.user)
        return ctx.sendMessage('address.done')
    })
}