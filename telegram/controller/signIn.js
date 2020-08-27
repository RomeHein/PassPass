const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('notDenseNeighborhood')
    .use('before', ({sendMessage}) => sendMessage('signIn.notDenseNeighborhood'))
    .invoke(({go}) => go('signInPrmAccount-2'))

    bot.command('signInPrmAccount-1').invoke(({sendMessage}) => sendMessage('signIn.neighborDensity'))
    .keyboard([
        [{ 'keyboard.signIn.neighborDensity.dense': { go: 'signInPrmAccount-2' } }],
        [{ 'keyboard.signIn.neighborDensity.notDense': { go: 'notDenseNeighborhood' } }]
    ])

    bot.command('signInPrmAccount-2').invoke( ({sendMessage}) => sendMessage('signIn.mailAddress'))
    .keyboard([
        [{ 'keyboard.signIn.mailAddress.ok': { go: 'address-country' } }],
        [{ 'keyboard.signIn.mailAddress.pass': { go: 'signInPrmAccount-3' } }]
    ])

    bot.command('signInPrmAccount-3')
    .invoke( async ({session, sendMessage}) =>{ 
        if (!session.user.tasks || session.user.tasks.constructor !== Array) {
            session.user.tasks = []
            return sendMessage('signIn.taskList')
        } else if (session.user.tasks && !session.user.tasks.length) {
            return sendMessage('signIn.noSelectedTasks')
        }
        return sendMessage('signIn.selectedTasks')
    })
    .keyboard([
        [{ 'keyboard.signIn.addTask1': {value: 1 ,isShown: (ctx) => !ctx.session.user.tasks || ctx.session.user.tasks.indexOf(1) === -1}},
        { 'keyboard.signIn.removeTask1': {value: -1 ,isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.indexOf(1) !== -1}},
        { 'keyboard.signIn.addTask2': {value: 2 ,isShown: (ctx) => !ctx.session.user.tasks || ctx.session.user.tasks.indexOf(2) === -1}},
        { 'keyboard.signIn.removeTask2': {value: -2 ,isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.indexOf(2) !== -1}}],
        [{ 'keyboard.signIn.addTask3': {value: 3 ,isShown: (ctx) => !ctx.session.user.tasks || ctx.session.user.tasks.indexOf(3) === -1}},
        { 'keyboard.signIn.removeTask3': {value: -3 ,isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.indexOf(3) !== -1}},
        { 'keyboard.signIn.addTask4': {value: 4 ,isShown: (ctx) => !ctx.session.user.tasks || ctx.session.user.tasks.indexOf(4) === -1}},
        { 'keyboard.signIn.removeTask4': {value: -4 ,isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.indexOf(4) !== -1}}],
        [{ 'keyboard.signIn.taskSelectionOver': {go : 'signInPrmAccount-4', isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.length}}]
    ])
    .answer(({session, answer, data, repeat}) => {
        if (answer > 0) {
            session.user.tasks.push(ctx.answer)
        } else {
            session.user.tasks = session.user.tasks.filter((taskId) => -answer !== taskId)
        }
        data.selectedTasksString = session.user.tasks.reduce((previous, taskId) => {
            if (previous) {
                previous += ', '
            }
            if (taskId ===1) {
                previous += 'A'
            } else if (taskId === 2) {
                previous += 'B'
            } else if (taskId === 3) {
                previous += 'C'
            } else if (taskId === 4) {
                previous += 'D'
            }
            return previous
        },'')
        return repeat();
      });

    bot.command('signInPrmAccount-4')
    .use('before', ({sendMessage}) => sendMessage('signIn.accountCreation'))
    .use('beforeInvoke', async ({session, sendMessage}) => {
        // First format task object before sending to db
        session.user.tasks = session.tasks.map((taskId => {return {id: taskId}}))
        session.user = await User.save(session.user, true)
        return sendMessage('signIn.accountCreationDone')
    })
    invoke(({go}) => go('qrCodeGeneration-1'))
}