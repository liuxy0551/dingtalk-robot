const Service = require('egg').Service
const db = require('../utils/db')
const { getWhere, getOrder } = require('../utils')

class MoneyInfoService extends Service {
  async getMoneyInfos ({ senderId = '' }, typeList = ['jijin', 'gupiao']) {
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

  async createMoneyInfo (moneyInfo) {
    try {
      const res = await db.MoneyInfo.create(moneyInfo)
      return res
    } catch (err) {
      throw err
    }
  }

  async sortMoneyInfo (current, target) {
    try {
      const res1 = await db.MoneyInfo.update({ sort: current.sort }, {
        where: getWhere({
          moneyInfoId: current.moneyInfoId
        }),
        raw: true
      })
      const res2 = await db.MoneyInfo.update({ sort: target.sort }, {
        where: getWhere({
          moneyInfoId: target.moneyInfoId
        }),
        raw: true
      })
      return [res1, res2]
    } catch (err) {
      throw err
    }
  }

  async deleteMoneyInfo (senderId, code) {
    try {
      const res = await db.MoneyInfo.update({ isDelete: 1 }, {
        where: getWhere({
          senderId,
          code
        }),
        raw: true
      })
      return res
    } catch (err) {
      throw err
    }
  }
}

module.exports = MoneyInfoService
