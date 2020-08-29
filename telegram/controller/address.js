const User = require('../../model/UserModel')
module.exports = (bot) => {

    bot.command('address-confirm')
    .use('beforeInvoke', async (ctx)=> {
        const user = await User.findByTelegramId(ctx.meta.user.id)
        if (user.country && user.city && user.mailAddress) {
            ctx.data.user = user
        } else {
            return ctx.go(address-country)
        }
    })
    .invoke(async (ctx) => {
        if (ctx.data.user.country && ctx.data.user.city && ctx.data.user.mailAddress) {
            return ctx.sendMessage('address.confirm')
        }
        await ctx.sendMessage('address.needAddress')
        return ctx.go('address-country')
    })
    .keyboard([
        [{ 'keyboard.address.confirm.true': {go: 'qrCodeGeneration-4-sent-to-mail'}}],
        [{ 'keyboard.address.confirm.false': {go: 'address-country'}}]
    ])

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
            return ctx.go('setTasks')
        }
        await User.update(ctx.session.user)
        return ctx.sendMessage('address.done')
    })
}