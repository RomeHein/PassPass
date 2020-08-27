const User = require('../../model/UserModel')
const { user } = require('../../model/sql')
module.exports = (bot) => {
    bot.command('qrCodeGeneration-1')
    user('before', ({sendMessage}) => sendMessage('qrCode.introduction'))
    .invoke(({sendMessage}) => sendMessage('qrCode.textCustomisation'))
    .answer(({go, answer, session}) => {
        session.pool.qrCodeLabel = answer
        return go('qrCodeGeneration-2')
    })

    bot.command('qrCodeGeneration-2')
}