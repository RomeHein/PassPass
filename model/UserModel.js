const sql = require('./sql')
const pgp = require('pg-promise')()
const Helper = require('../Helper')
const Task = require('./TaskModel')
const Pool = require('./PoolModel')
const { task } = require('./sql')

/// Class project, handle db access
module.exports = class User {
  constructor (jsonObject) {
    if (jsonObject) {
      this.id = jsonObject.user_id
      this.prmStatus = jsonObject.user_prm_status
      this.status = jsonObject.user_status
      this.telegramId = jsonObject.user_telegram_id
      this.telegramName = jsonObject.user_telegram_name
      this.messengerId = jsonObject.user_messenger_id
      this.messengerName = jsonObject.user_messenger_name
      this.country = jsonObject.user_country
      this.city = jsonObject.user_city
      this.mailAddress = jsonObject.user_mail_address
      this.tasks = jsonObject.user_tasks
    }
  }

  static parseArray (arrayObject) {
    if (arrayObject && arrayObject.constructor === Array) {
      return arrayObject.map(o => new User(o))
    }
    return []
  }

  static async findById (id) {
    if (!id) {
      throw new Error('Main parameters not defined')
    }
    const data = await Connector.db.tx(t => t.oneOrNone(sql.user.findById, id))
    if (data) {
      return new User(data)
    }
  }

  static async findByTelegramId (id) {
    if (!id) {
      throw new Error('Main parameters not defined')
    }
    const data = await Connector.db.tx(t => t.oneOrNone(sql.user.findByTelegramId, id))
    if (data) {
      return new User(data)
    }
  }

  async followPrmUser(userId) {
    if (!userId || !this.id) {
      throw new Error('Main parameters not defined')
    }
    const pool = (await Pool.findByUser(userId)).find((pool) => pool.ownerId === userId)
    // Pool exist
    if (pool) {
      // Now check if we 
      const userPoolParams = {
        user_id: this.id,
        pool_id: pool.id
      }
      const inserUserPool = `SET search_path TO ${process.env.dbSchema};` + pgp.helpers.insert(userPoolParams, Object.keys(userPoolParams), 'user_pool')
      return Connector.db.tx(t => t.none(inserUserPool))
    } else {
      throw new Error('Pool does not exist')
    }
  }

  async addToPool(poolId) {
    if (!poolId || !this.id) {
      throw new Error('Main parameters not defined')
    }
    const pool = await Pool.findById(poolId)
    // Pool exist
    if (pool) {
      // Now check if we 
      const userPoolParams = {
        user_id: this.id,
        pool_id: poolId
      }
      const inserUserPool = pgp.helpers.insert(userPoolParams, Object.keys(userPoolParams), 'user_pool')
      return Connector.db.tx(t => t.none(inserUserPool))
    } else {
      throw new Error('Pool does not exist')
    }
  }

  /// Return all users
  static async all (status) {
    const data = await Connector.db.tx(t => {
      if (status) {
        return t.manyOrNone(sql.user.findAllByStatus, status)
      }
      return t.manyOrNone(sql.user.findAll)
    })
    return User.parseArray(data)
  }

  static async allByPrmUser (prmUserId) {
    if (!prmUserId) {
      throw new Error('Main parameters not defined')
    }
    const data = await Connector.db.tx(t => t.manyOrNone(sql.user.findAllByPrmUser,prmUserId))
    return User.parseArray(data)
  }

  static async save ({ prmStatus, telegramId, telegramName, messengerId, messengerName, status, city, country, mailAddress, tasks }, returnObject) {
    if (!telegramId && !messengerId) {
      throw new Error('Main parameters not defined')
    }

    const params = {
      user_id: Helper.generateID(),
      user_prm_status: prmStatus || 0,
      user_status_id: status.id,
      user_telegram_id: telegramId,
      user_telegram_name: telegramName,
      user_messenger_id: messengerId,
      user_messenger_name: messengerName,
      user_country: country,
      user_city: city,
      user_mail_address: mailAddress
    }
    const insertUser = `SET search_path TO ${process.env.dbSchema};` + pgp.helpers.insert(params, Object.keys(params), 'user') + ' RETURNING *;'
    const data = await Connector.db.tx(t => {
      let queries = [t.oneOrNone(insertUser)]
      if (tasks) {
        tasks.forEach((task) => {
          const userTaskParams = {
            user_id: params.user_id,
            task_id: task.id
          }
          queries.push(t.none(pgp.helpers.insert(userTaskParams, Object.keys(userTaskParams), 'user_task')))
        })
      }
      return t.batch(queries)
    })
    if (returnObject && data[0]) {
      return new User(data[0])
    }
  }

  async remove() {
    if (!this.id) {
      throw new Error('Main parameters not defined')
    }
    return Connector.db.tx(t => t.none(sql.user.delete,this.id))
  }

  update (returnObject) {
    return User.update(this, returnObject)
  }

  static async update (user, returnObject) {
    if (!user.id) {
      return Promise.reject(new Error('Identifier parameter not defined'))
    }

    let updateBuilder = {}

    if (user.prmStatus) {
      updateBuilder.user_prm_status = user.prmStatus
    }
    if (user.status) {
      updateBuilder.user_status_id = user.status.id
    }
    if (user.telegramName) {
      updateBuilder.user_telegram_name = user.telegramName
    }
    if (user.messengerName) {
      updateBuilder.user_messenger_name = user.messengerName
    }
    if (user.country) {
      updateBuilder.user_country = user.country
    }
    if (user.city) {
      updateBuilder.user_city = user.city
    }
    if (user.mailAddress) {
      updateBuilder.user_mail_address = user.mailAddress
    }
    if (Object.keys(updateBuilder).length === 0) {
      return Promise.reject(new Error('No changes found to be done'))
    }

    let params = Object.keys(updateBuilder)

    params.push('?user_id')
    updateBuilder.user_id = user.id

    const columnSet = pgp.helpers.ColumnSet(params, { table: { table: 'user', schema: process.env.botSchema } })
    const updateInformations = pgp.helpers.update([updateBuilder], columnSet) + ` WHERE v.user_id = t.user_id RETURNING *`

    const data = await Connector.db.task(t => t.oneOrNone(updateInformations))
    if (returnObject && data) {
      return new User(data)
    }
  }

  async updateTasks() {
    if (!this.id) {
      return Promise.reject(new Error('Identifier parameter not defined'))
    }
    const dbTasks = await Task.findByUser(this.id)
    const tasksToRemove = dbTasks.filter((dbTask) => {
      for (task in this.tasks) {
        if (task.id == dbTask.id) {
          return false
        }
        return true
      }
    })
    const tasksToAdd = this.tasks.filter((task) => {
      for (dbTask in dbTasks) {
        if (task.id == dbTask.id) {
          return false
        }
      }
      return true
    })
    return Connector.db.task(t => {
      let queries = []
      tasksToRemove.forEach((taskToRemove) => {
        queries.push(t.none(sql.task.deleteUserTask,taskToRemove.id,this.id))
      })
      tasksToAdd.forEach((taskToAdd) => {
        const userTaskParams = {
          user_id: this.id,
          task_id: taskToAdd.id
        }
        queries.push(t.none(pgp.helpers.insert(userTaskParams, Object.keys(userTaskParams), 'user_task')))
      })
      return t.batch(queries)
    })
  }
}
