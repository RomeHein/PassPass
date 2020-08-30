const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('notDenseNeighborhood')
    .use('before', (ctx) => ctx.sendMessage('signIn.notDenseNeighborhood'))
    .invoke((ctx) => ctx.go('signInPrmAccount-2'))

    bot.command('signInPrmAccount-1').invoke((ctx) => ctx.sendMessage('signIn.neighborDensity'))
    .keyboard([
        [{ 'keyboard.signIn.neighborDensity.dense': { go: 'signInPrmAccount-2' } }],
        [{ 'keyboard.signIn.neighborDensity.notDense': { go: 'notDenseNeighborhood' } }]
    ])

    bot.command('signInPrmAccount-2').invoke( (ctx) => ctx.sendMessage('signIn.mailAddress'))
    .keyboard([
        [{ 'keyboard.signIn.mailAddress.ok': { go: 'address-country' } }],
        [{ 'keyboard.signIn.mailAddress.pass': { go: 'setTasks'} }]
    ])

    bot.command('signInPrmAccount-3')
    .use('before', (ctx) => ctx.sendMessage('signIn.accountCreation'))
    .use('beforeInvoke', async (ctx) => {
        // First format task object before sending to db
        ctx.session.user.tasks = ctx.session.user.tasks.map((taskId => {return {id: taskId}}))
        ctx.session.user.status = {id:1}
        ctx.session.user = await User.save(ctx.session.user, true)
        return ctx.sendMessage('signIn.prmAccountCreationDone')
    })
    .invoke((ctx) => ctx.go('qrCodeGeneration-1'))

    // Helper signin
    bot.command('notLivingNearby')
    .invoke((ctx) => ctx.sendMessage('notLivingNearby'))

    bot.command('signInHelperAccount-1').invoke((ctx) => ctx.sendMessage('signIn.livingNearby'))
    .keyboard([
        [{ 'keyboard.signIn.livingNearby.true': { go: 'setTasks' } }],
        [{ 'keyboard.signIn.livingNearby.false': { go: 'notLivingNearby' } }]
    ])

    bot.command('signInHelperAccount-2')
    .use('before', (ctx) => ctx.sendMessage('signIn.accountCreation'))
    .invoke(async (ctx) =>{
        ctx.data.scannedUser = ctx.session.scannedUser
        const taskListObject = ctx.session.user.tasks.map((taskId => {return {id: taskId}}))
        ctx.session.user.tasks = taskListObject
        ctx.session.user.status = {id:1}
        ctx.session.user = await User.save(ctx.session.user, true)
        ctx.session.user.tasks = taskListObject
        await ctx.session.user.followPrmUser(ctx.session.scannedUser.id)
        await TelegramNotifier.prmHasNewHelper(ctx.data.scannedUser,ctx.session.user)
        return ctx.sendMessage('signIn.helperAccountCreationDone')
    })

    bot.command('addPrmToHelperList')
    .use('before', async (ctx) => {
        await ctx.sendMessage('task.selectedTasksByPrm')
        ctx.data.scannedUser = ctx.session.scannedUser
        await Promise.all(ctx.data.scannedUser.tasks.map((task)=>ctx.sendMessage(task.label)))
    }) 
    .invoke((ctx) => ctx.sendMessage('signIn.confirmAddNewPrm')) 
    .keyboard([
        [{ 'keyboard.confirmNewPrm.ok': 1},
        { 'keyboard.confirmNewPrm.no': 0}]
    ])
    .answer(async (ctx) =>{
        if (ctx.answer) {
            await ctx.session.user.followPrmUser(ctx.session.scannedUser.id)
            await TelegramNotifier.prmHasNewHelper(ctx.data.scannedUser,ctx.session.user)
            return ctx.sendMessage('signIn.helperNewPrm')
        }
    })
}