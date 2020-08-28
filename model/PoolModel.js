const sql = require('./sql')
const pgp = require('pg-promise')()
const Helper = require('../Helper')

/// Class project, handle db access
module.exports = class Pool {
  constructor (jsonObject) {
    if (jsonObject) {
      this.id = jsonObject.pool_id
      this.ownerId = jsonObject.pool_owner_id
      this.label = jsonObject.pool_label
      this.qrCode = jsonObject.pool_qrcode
      this.qrCodeLabel = jsonObject.pool_qrcode_label
      this.qrCodeThemeId = jsonObject.pool_qrcode_theme_id
    }
  }

  static parseArray (arrayObject) {
    if (arrayObject && arrayObject.constructor === Array) {
      return arrayObject.map(o => new Pool(o))
    }
    return []
  }

  static async findById (id) {
    if (!id) {
      throw new Error('Main parameters not defined')
    }
    const data = await Connector.db.tx(t => t.oneOrNone(sql.pool.findById, id))
    if (data) {
      return new Pool(data)
    }
  }

  static async findByUser (id) {
    if (!id) {
      throw new Error('Main parameters not defined')
    }
    const data = await Connector.db.tx(t => t.manyOrNone(sql.pool.findByUser, id))
    return Pool.parseArray(data)
  }

  static async save ({ label, ownerId, qrCodeLabel, qrCodeThemeId}, returnObject) {
    if (!ownerId) {
      throw new Error('Main parameters not defined')
    }

    const params = {
      pool_id: Helper.generateID(),
      pool_owner_id: ownerId,
      pool_label: label,
      pool_qrcode_label: qrCodeLabel,
      pool_qrcode_theme_id: qrCodeThemeId,
    }
    const insertPool = `SET search_path TO ${process.env.dbSchema};` + pgp.helpers.insert(params, Object.keys(params), 'pool') + ' RETURNING *;'

    const data = await Connector.db.tx(t => t.oneOrNone(insertPool))
    if (returnObject && data) {
      return new Pool(data)
    }
  }

  update (returnObject) {
    return Task.update(this, returnObject)
  }

  static async update ({id, qrCodeLabel, qrCodeThemeId}, returnObject) {
    if (!id) {
      return Promise.reject(new Error('Identifier parameter not defined'))
    }

    let updateBuilder = {}

    if (qrCodeLabel) {
      updateBuilder.pool_qrcode_label = qrCodeLabel
    }
    if (qrCodeThemeId) {
      updateBuilder.pool_qrcode_theme_id = qrCodeThemeId
    }
    if (Object.keys(updateBuilder).length === 0) {
      return Promise.reject(new Error('No changes found to be done'))
    }

    let params = Object.keys(updateBuilder)

    params.push('?pool_id')
    updateBuilder.pool_id = id

    const columnSet = pgp.helpers.ColumnSet(params, { table: { table: 'pool', schema: process.env.botSchema } })
    const updateInformations = pgp.helpers.update([updateBuilder], columnSet) + ` WHERE v.pool_id = t.pool_id RETURNING *`

    const data = await Connector.db.task(t => t.oneOrNone(updateInformations))
    if (returnObject && data) {
      return new Pool(data)
    }
  }
}
