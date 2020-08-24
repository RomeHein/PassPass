const sql = require('./sql')
const pgp = require('pg-promise')()
const Helper = require('../Helper')

/// Class project, handle db access
module.exports = class Task {
  constructor (jsonObject) {
    if (jsonObject) {
      this.id = jsonObject.task_id
      this.type = jsonObject.task_type
      this.label = jsonObject.task_label
      this.defaultSeverity = jsonObject.task_default_severity
    }
  }

  static parseArray (arrayObject) {
    if (arrayObject && arrayObject.constructor === Array) {
      return arrayObject.map(o => new Task(o))
    }
    return []
  }

  static async findById (id) {
    if (!id) {
      throw new Error('Main parameters not defined')
    }
    const data = await Connector.db.tx(t => t.oneOrNone(sql.task.findById, id))
    if (data) {
      return new Task(data)
    }
  }

  static async findByUser (id) {
    if (!id) {
      throw new Error('Main parameters not defined')
    }
    const data = await Connector.db.tx(t => t.manyOrNone(sql.task.findByUser, id))
    return Task.parseArray(data)
  }

  /// Return all users
  static async all (severity) {
    const data = await Connector.db.tx(t => {
      if (severity) {
        return t.manyOrNone(sql.task.findAllBySeverity, severity)
      }
      return t.manyOrNone(sql.task.findAll)
    })
    return Task.parseArray(data)
  }

  static async save ({ type, label, defaultSeverity}, returnObject) {
    if (!type || !label) {
      throw new Error('Main parameters not defined')
    }

    const params = {
      task_id: Helper.generateID(),
      task_type: type,
      task_label: label,
      task_default_severity: defaultSeverity || 0,
    }
    const insertTask = pgp.helpers.insert(params, Object.keys(params), 'task') + ' RETURNING *'

    return Connector.db.tx(t => t.oneOrNone(insertTask))
      .then(data => (returnObject && data ? new Task(data) : null))
  }

  update (returnObject) {
    return Task.update(this, returnObject)
  }

  static async update (task, returnObject) {
    if (!task.id) {
      return Promise.reject(new Error('Identifier parameter not defined'))
    }

    let updateBuilder = {}

    if (task.type) {
      updateBuilder.task_type = task.type
    }
    if (task.label) {
      updateBuilder.task_label = task.label.id
    }
    if (task.defaultSeverity) {
      updateBuilder.task_default_severity = task.defaultSeverity
    }
    if (Object.keys(updateBuilder).length === 0) {
      return Promise.reject(new Error('No changes found to be done'))
    }

    let params = Object.keys(updateBuilder)

    params.push('?task_id')
    updateBuilder.task_id = task.id

    const columnSet = pgp.helpers.ColumnSet(params, { table: { table: 'task', schema: process.env.botSchema } })
    const updateInformations = pgp.helpers.update([updateBuilder], columnSet) + ` WHERE v.task_id = t.task_id RETURNING *`

    return Connector.db.task(t => t.oneOrNone(updateInformations))
      .then(data => (returnObject && data ? new Task(data) : null))
  }
}
