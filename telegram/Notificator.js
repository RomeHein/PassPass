const User = require('../model/UserModel')
const Event = require('../model/EventModel')
const Locales = require('../locales')

let instance = null

module.exports = class Notificator {
    constructor (bot) {
        if (!instance) {
            instance = this
            this.api = bot.api
        }
        return instance
    }

    // Notify a prm user he has new helper in his pool
    async prmHasNewHelper (locale, prmUser, helperUser) {
        if (prmUser.telegramId) {
            const taskList = helperUser.tasks.map((task)=>Locales[locale].task[task.label]).join('/n')
            this.api.sendMessage(prmUser.telegramId, helperUser.telegramName+ " vient juste de s'inscrire pour vous aider!/nIl essayera de se rendre disponible pour les tâches suivantes:/n" +taskList)
        }
    }

    async prmRequestHelp (prmUser, task) {
        if (prmUser && prmUser.id && task) {
            try {
                await Event.save({task, prmUser})
                const helpers = await User.allByPrmUser(prmUser.id)
                return Promise.all(helpers.map((helper) => this.api.sendMessage(helper.telegramId,`${prmUser.telegramName} demande votre assistance pour la tâche ${task.label}
                Souhaitez-vous aider?
                Sinon, ne tenez pas compte de ce message ;)
                `,{
                    reply_markup: {
                        inline_keyboard: [[{text: `J'arrive`, callback_data:`assist-${prmUser.id}`}],[{text: `Décliner`, callback_data:`decline-${prmUser.id}`}]]
                    }
                })))
            } catch(err) {
                console.error(err)
            }
        }
    }
}