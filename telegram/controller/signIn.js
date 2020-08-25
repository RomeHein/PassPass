const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('notDenseNeighborhood', async (ctx) => {
        await ctx.sendMessage('signIn.notDenseNeighborhood')
        return ctx.go('signInPrmAccount-2')
    })
    bot.command('signInPrmAccount-1', (ctx) => {
        return ctx.sendMessage('signIn.neighborDensity')
    })
    .keyboard([
        [{ 'keyboard.signIn.neighborDensity.dense': { go: 'signInPrmAccount-2' } }],
        [{ 'keyboard.signIn.neighborDensity.notDense': { go: 'notDenseNeighborhood' } }]
    ])

    bot.command('signInPrmAccount-2', (ctx) => {
        return ctx.sendMessage('signIn.mailAddress')
    })
    .keyboard([
        [{ 'keyboard.signIn.mailAddress.ok': { go: 'setUpMailAddress' } }],
        [{ 'keyboard.signIn.mailAddress.pass': { go: 'signInPrmAccount-3' } }]
    ])

    bot.command('signInPrmAccount-3', (ctx) => {
        return ctx.sendMessage('signIn.termsAndConditions')
    })
    .keyboard([
        [{ 'keyboard.signIn.mailAddress.ok': { go: 'setUpMailAddress' } }],
        [{ 'keyboard.signIn.mailAddress.pass': { go: 'signInPrmAccount-3' } }]
    ])
}