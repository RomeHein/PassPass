const Pool = require('../../model/PoolModel')
const User = require('../../model/UserModel')
const QRCode = require('qrcode')
module.exports = (bot) => {
    bot.command('qrCodeGeneration-1')
    .use('beforeInvoke', (ctx) => ctx.sendMessage('qrCode.introduction'))
    .invoke((ctx) => ctx.sendMessage('qrCode.textCustomisation'))
    .answer((ctx) => {
        ctx.session.pool = {}
        ctx.session.pool.ownerId = ctx.session.user.id
        ctx.session.pool.qrCodeLabel = ctx.answer
        return ctx.go('qrCodeGeneration-2')
    })

    bot.command('qrCodeGeneration-2')
    .use('beforeInvoke', async (ctx) => {
        ctx.session.pool = await Pool.save(ctx.session.pool)
        await QRCode.toFile(`./storage/tempQRCode-${ctx.session.user.id}.png`,`https://t.me/passpassbot?start=${ctx.session.user.id}`)
        return ctx.sendPhoto(`./storage/tempQRCode-${ctx.session.user.id}.png`)
    })
    .invoke((ctx) => ctx.go('qrCodeGeneration-3'))

    bot.command('qrCodeGeneration-3')
    .invoke((ctx) => ctx.sendMessage('qrCode.done'))

    bot.command('qrCode')
    .invoke(async (ctx) => {
        if (!ctx.session.user || !ctx.session.user.id) {
            ctx.session.user = await User.findByTelegramId(ctx.meta.user.id)
        }
        if (!ctx.session.user || !ctx.session.user.id) {
            return ctx.sendMessage('qrCode.notSignedIn')
        }
        await QRCode.toFile(`./storage/tempQRCode-${ctx.session.user.id}.png`,`https://t.me/passpassbot?start=${ctx.session.user.id}`)
        return ctx.sendPhoto(`./storage/tempQRCode-${ctx.session.user.id}.png`)
    })
}