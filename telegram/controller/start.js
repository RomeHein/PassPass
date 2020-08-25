const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('start')
    .use('before', async (ctx) => {
        // If we have a argument it means we are coming from a deep link, certainly from a scanned qrcode
        if (ctx.args.length) {
            try {   
                const scannedUser = await User.findById(ctx.args[0])
                ctx.data.scannedUser = scannedUser
                return ctx.sendMessage('introduction.welcome.helper');
            } catch (_) {
                return ctx.sendMessage('introduction.qrcodeNonAvailable');
            }
        // Otherwise this is certainly someone interested in PassPass
        } else {
            // Check if we already signed in 
            if (!ctx.data.user) {
                ctx.signInStatus = 1
                ctx.data.user = {}
                return ctx.sendMessage('introduction.welcome.pmr');
            } else {
                return ctx.sendMessage('introduction.alreadySignedIn');
            }
            
        }
    })
    .invoke((ctx) => {
        ctx.sendMessage('introduction.disclaimer')
        return ctx.sendMessage('introduction.samples')
    })
    .keyboard([
        [{'keyboard.introduction.continue': {go: 'signInPrmAccount-1'}}],
        [{'keyboard.introduction.notAPrm': {go: 'notAPrm'}}]
    ])

    bot.command('notAPrm', (ctx) => {
        return ctx.sendMessage('introduction.notAPrm')
    })
}