const Sequelize = require('sequelize')
const initModels = require('../../models/init-models')
const { host, user, password, database, dialect, timezone, logging } = require('../../../config/db.config')
const sequelize = new Sequelize(database, user, password, { host, dialect, define: { timestamps: false }, timezone, logging })

module.exports = {
  ...initModels(sequelize),
  sequelize,
  Sequelize
}
