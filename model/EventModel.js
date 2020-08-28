const sql = require('./sql')
const pgp = require('pg-promise')()
const Helper = require('../Helper')

/// Class project, handle db access
module.exports = class Event {
  constructor (jsonObject) {
    if (jsonObject) {
      this.id = jsonObject.task_id
      this.task = jsonObject.task
      this.prmUser = jsonObject.user_prm
      this.userHelper = jsonObject.user_helper
      this.statusId = jsonObject.event_status
      this.severityId = jsonObject.event_severity
    }
  }

  static parseArray (arrayObject) {
    if (arrayObject && arrayObject.constructor === Array) {
      return arrayObject.map(o => new Event(o))
    }
    return []
  }

  static async findByUser (id) {
    if (!id) {
      throw new Error('Main parameters not defined')
    }
    return Connector.db.tx(t => t.oneOrNone(sql.task.findByUser, id))
  }

  static async save ({ task, prmUser, severity}, returnObject) {
    if (!task || !prmUser) {
      throw new Error('Main parameters not defined')
    }

    const params = {
      event_id: Helper.generateID(),
      task_id: task.id,
      user_prm_id: prmUser.id,
      event_status: 0,
      event_severity: severity || 0
    }
    const insertEvent = `SET search_path TO ${process.env.dbSchema};` + pgp.helpers.insert(params, Object.keys(params), 'task_event') + ' RETURNING *;'

    const data = await Connector.db.tx(t => t.oneOrNone(insertEvent))
    if (returnObject && data) {
        return new Event(data)
    }
  }

  update (returnObject) {
    return Event.update(this, returnObject)
  }

  static async update ({id, statusId, severity, helperUser}, returnObject) {
    if (!id) {
      return Promise.reject(new Error('Identifier parameter not defined'))
    }

    let updateBuilder = {}

    if (statusId) {
      updateBuilder.event_status = statusId
    }
    if (severity) {
      updateBuilder.event_severity = severity
    }
    if (helperUser && helperUser.id) {
      updateBuilder.user_helper_id = helperUser.id
    }
    if (Object.keys(updateBuilder).length === 0) {
      return Promise.reject(new Error('No changes found to be done'))
    }

    let params = Object.keys(updateBuilder)

    params.push('?event_id')
    updateBuilder.event_id = id

    const columnSet = pgp.helpers.ColumnSet(params, { table: { table: 'task_event', schema: process.env.botSchema } })
    const updateInformations = pgp.helpers.update([updateBuilder], columnSet) + ` WHERE v.event_id = t.event_id RETURNING *;`

    const data = await Connector.db.task(t => t.oneOrNone(updateInformations))
    if (returnObject && data) {
        return new Event(data)
    }
  }
}
