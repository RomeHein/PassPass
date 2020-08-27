const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('start')
    .use('before', async (ctx) => {
        const user = await User.findByTelegramId(ctx.meta.user.id)
        ctx.session.user = user || {}
        ctx.session.user.telegramId = ctx.meta.user.id
        ctx.session.user.telegramName = ctx.meta.user.first_name
        // If we have an argument it means we are coming from a deep link, certainly from a scanned qrcode
        if (ctx.startPayload) {
            try {
                // Only continue as an helper if current user does not exist or is not a PRM
                if (!user || user.prmStatus === 0) {
                    if (!user) {
                        ctx.session.user.prmStatus = 0
                    }
                    const scannedUser = await User.findById(ctx.args[0])
                    ctx.session.scannedUser = scannedUser
                    ctx.data.scannedUser = scannedUser
                    return ctx.sendMessage('introduction.welcome.helper');
                } else {
                    return ctx.sendMessage('introduction.prmHelper');
                }
            } catch (_) {
                return ctx.sendMessage('introduction.qrcodeNonAvailable');
            }
        // Otherwise this is certainly someone interested in PassPass
        } else {
            // Check if we already signed in 
            if (user) {
                return ctx.sendMessage('introduction.alreadySignedIn');
            } else {
                ctx.session.user.prmStatus = 1
                return ctx.sendMessage('introduction.welcome.prm');
            }
        }
    })
    .invoke((ctx) => {
        if (ctx.session.scannedUser) {
            return ctx.go('moreInfoHelper')
        }
        return ctx.go('moreInfoPrm')
    });

    bot.command('moreInfoPrm')
    .use('before', (ctx) => ctx.sendMessage('introduction.disclaimer'))
    .keyboard([
        [{'keyboard.introduction.continue': {go: 'termsAndConditionsPrm'}}],
        [{'keyboard.introduction.notAPrm': {go: 'notAPrm'}}]
    ]);

    bot.command('moreInfoHelper')
    .use('before', (ctx) => ctx.sendMessage('introduction.disclaimer'))
    .use('beforeInvoke', (ctx) => ctx.sendMessage('introduction.samples'))
    .invoke((ctx) => ctx.go('termsAndConditionsHelper'));
   
    bot.command('termsAndConditionsHelper')
    .invoke((ctx) => ctx.sendMessage('introduction.termsAndConditions'))
    .keyboard([
        [{'keyboard.termsAndConditions.agree': {go: 'signInHelperAccount-1'}}],
        [{'keyboard.termsAndConditions.notAgree': {go: 'termsAndConditionsDenied'}}]
    ])

    bot.command('termsAndConditionsPrm')
    .invoke((ctx) => ctx.sendMessage('introduction.termsAndConditions'))
    .keyboard([
        [{'keyboard.termsAndConditions.agree': {go: 'signInPrmAccount-1'}}],
        [{'keyboard.termsAndConditions.notAgree': {go: 'termsAndConditionsDenied'}}]
    ])

    bot.command('notAPrm').invoke((ctx) => ctx.sendMessage('introduction.notAPrm'))
    bot.command('termsAndConditionsDenied').invoke((ctx) => ctx.sendMessage('introduction.termsAndConditionsDenied'));
}