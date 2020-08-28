const User = require('../model/UserModel')
const Pool = require('../model/PoolModel')
const Event = require('../model/EventModel')

let instance = null

module.exports = class Notifier {
    constructor (bot) {
        if (!instance) {
            instance = this
            this.api = bot.api
        }
        return instance
    }

    // Notify a prm user he has new helper in his pool
    async prmHasNewHelper(prmUser, helperUser) {
        if (prmUser.telegramId) {
            this.api.sendMessage(prmUser.telegramId, `${helperUser.telegramName} vient juste de s'inscrire pour vous aider! 
            Il essayera de se rendre disponible pour les tâches suivantes: ${helperUser.tasks.map((task)=>task.id).join(',')}`)
        }
    }

    async prmRequestHelp(prmUser, task) {
        if (prmUser && prmUser.id && task) {
            try {
                await Event.save({task, prmUser})
                const helpers = await User.allByPrmUser(prmUser.id)
                return Promise.all(helpers.map((helper) => this.api.sendMessage(helper.telegramId,`${prmUser.telegramName} demande votre assistance pour la tâche ${task.label}
                Souhaitez-vous aider? /assist
                Sinon ne tenez pas compte de ce message ;)
                `)))
            } catch(err) {
                console.error(err)
            }
        }
    }
}