const User = require('../model/UserModel')
const Event = require('../model/EventModel')
module.exports = (bot) => {
    bot.api.on('callback_query', async (msg) => {
        bot.api.answerCallbackQuery(msg.id)
        if (msg.data) {
            const arguments = msg.data.split('-')
            if (arguments[0] === 'assist') {
                if (arguments[1]) {
                    try {
                        // Find PRM user
                        const [prmUser, helperUser] = await Promise.all([User.findById(arguments[1]), User.findByTelegramId(msg.from.id)])
                        //const prmEvent = await Event.findByUser(prmUser.id,true)
                        if (!prmUser) {
                            return
                        }
                        // Update message from helper
                        if (msg.message.message_id) {
                            await bot.api.editMessageText(`Je viens de prévenir ${prmUser.telegramName}`,{chat_id:helperUser.telegramId, message_id: msg.message.message_id})
                        }
                        // Notify PRM user that someone come, update event first
                        //await Event.update({id: prmEvent.id, statusId: 1, helperUser})
                        await bot.api.sendMessage(prmUser.telegramId, `${msg.from.first_name} arrive!
                        N'oubliez pas de me prévenir une fois que vous avez été aidé via la commande /done`)
                    } catch(err) {
                        console.error(err)
                    } 
                }
            } else if (arguments[0] === 'decline') {
                bot.api.editMessageText(`Ok!`,{inline_message_id: msg.message.message_id})
            }
        }
    })
}