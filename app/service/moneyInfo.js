const Service = require('egg').Service
const db = require('../utils/db')
const { getWhere, getOrder } = require('../utils')

class MoneyInfoService extends Service {
  async getMoneyInfos (senderId, typeList = ['jijin', 'gupiao']) {
    try {
      let moneyInfos = {}
      for (let type of typeList) {
        let list = await db.MoneyInfo.findAll({
          where: getWhere({
            senderId,
            type
          }),
          order: getOrder(),
          raw: true
        })
        moneyInfos[type] = list
      }
      return moneyInfos
    } catch (err) {
      throw err
    }
  }

  async createMoneyInfo (moneyInfos) {
    try {
      const list = await db.MoneyInfo.bulkCreate(moneyInfos)
      return list
    } catch (err) {
      throw err
    }
  }
}

module.exports = MoneyInfoService
