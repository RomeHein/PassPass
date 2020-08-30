const User = require('../../model/UserModel')
module.exports = (bot) => {
    bot.command('setTasks')
    .invoke(async (ctx) => { 
        if (!ctx.hasRepeat) {
            if (!ctx.session.user) {
                ctx.session.user = await User.findByTelegramId(ctx.meta.user.id)
                if (!ctx.session.user) {
                    return ctx.go('notSignedIn')
                }
            }
            if (!ctx.session.user.tasks || ctx.session.user.tasks.constructor !== Array) {
                ctx.session.user.tasks = []
                if (ctx.session.user.prmStatus === 0) {
                    return ctx.sendMessage('task.taskListHelper')
                }
                return ctx.sendMessage('task.taskListPrm')
            } else if (ctx.session.user.tasks && !ctx.session.user.tasks.length) {
                return ctx.sendMessage('task.noSelectedTasks')
            }
            ctx.session.user.tasks = ctx.session.user.tasks.map((task)=>task.id)
            ctx.data.selectedTasksString = tasksToString(ctx.session.user.tasks)
        }
        if (ctx.session.user.tasks && !ctx.session.user.tasks.length) {
            return ctx.sendMessage('task.noSelectedTasks')
        }
        return ctx.sendMessage('task.selectedTasks')
    })
    .keyboard([
        [{ 'keyboard.task.addTask1': {value: 1 ,isShown: (ctx) => !ctx.session.user.tasks || ctx.session.user.tasks.indexOf(1) === -1}},
        { 'keyboard.task.removeTask1': {value: -1 ,isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.indexOf(1) !== -1}},
        { 'keyboard.task.addTask2': {value: 2 ,isShown: (ctx) => !ctx.session.user.tasks || ctx.session.user.tasks.indexOf(2) === -1}},
        { 'keyboard.task.removeTask2': {value: -2 ,isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.indexOf(2) !== -1}}],
        [{ 'keyboard.task.addTask3': {value: 3 ,isShown: (ctx) => !ctx.session.user.tasks || ctx.session.user.tasks.indexOf(3) === -1}},
        { 'keyboard.task.removeTask3': {value: -3 ,isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.indexOf(3) !== -1}},
        { 'keyboard.task.addTask4': {value: 4 ,isShown: (ctx) => !ctx.session.user.tasks || ctx.session.user.tasks.indexOf(4) === -1}},
        { 'keyboard.task.removeTask4': {value: -4 ,isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.indexOf(4) !== -1}}],
        [{ 'keyboard.task.taskSelectionOver': {go : 'taskNext', isShown: (ctx) => ctx.session.user.tasks && ctx.session.user.tasks.length}}]
    ])
    .answer((ctx) => {
        if (ctx.answer > 0) {
            ctx.session.user.tasks.push(ctx.answer)
        } else {
            ctx.session.user.tasks = ctx.session.user.tasks.filter((taskId) => -ctx.answer !== taskId)
        }
        ctx.data.selectedTasksString = tasksToString(ctx.session.user.tasks)
        ctx.hasRepeat = 1
        return ctx.repeat();
    })

    const tasksToString = (tasks) => {
        return tasks.reduce((previous, task) => {
            if (previous) {
                previous += ', '
            }
            if (task === 1 || task.id === 1) {
                previous += 'A'
            } else if (task === 2 || task.id === 2) {
                previous += 'B'
            } else if (task === 3 || task.id === 3) {
                previous += 'C'
            } else if (task === 4 || task.id === 4) {
                previous += 'D'
            }
            return previous
        },'')
    }

    bot.command('taskNext')
    .invoke(async (ctx) =>{
        // If we don't have an id, it means we are still in the signIn process
        if (!ctx.session.user.id) {
            if (ctx.session.user.prmStatus === 0) {
                return ctx.go('signInHelperAccount-2')
            }
            return ctx.go('signInPrmAccount-3')
        }
        ctx.session.user.tasks = ctx.session.tasks.map((taskId => {return {id: taskId}}))
        ctx.session.user.status = {id:1}
        const currentUser = new User(ctx.session.user)
        await currentUser.updateTasks()
        return ctx.sendMessage('task.updated')
    })

    bot.command('tasks')
    .use('beforeInvoke', async (ctx) => {
        const user = await User.findByTelegramId(ctx.meta.user.id)
        ctx.session.user = user
        ctx.keyboard(user.tasks.map((task) => {
            const button = {}
            button[`task.${task.label}`] = {value: task.id}
            return [button]
        }));
    })
    .invoke((ctx) => ctx.sendMessage('task.requestHelp'))
    .answer(async (ctx) => {
        const selectedTask = ctx.session.user.tasks.find((task)=>+task.id===+ctx.answer)
        await TelegramNotifier.prmRequestHelp(ctx.session.user, selectedTask)
        return ctx.sendMessage('task.helpRequested')
    })
}