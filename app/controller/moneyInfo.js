const Controller = require('egg').Controller
const { getUuid, setCtxBody } = require('../utils')

class MoneyInfoController extends Controller {
  // 获取理财信息列表
  async getMoneyInfos () {
    try {
      const res = await this.ctx.service.moneyInfo.getMoneyInfos(this.ctx.query.senderId)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
  
  // 新增理财信息
  async createMoneyInfo () {
    try {
      const { senderId, jijinList, gupiaoList } = this.ctx.request.body
      let moneyInfos = []
      for (let i of jijinList) {
        const { name, code, sort } = i
        moneyInfos.push({ senderId, moneyInfoId: getUuid(), type: 'jijin', name, code, sort })
      }
      for (let i of gupiaoList) {
        const { name, code, sort } = i
        moneyInfos.push({ senderId, moneyInfoId: getUuid(), type: 'gupiao', name, code, sort })
      }

      const res = await this.ctx.service.moneyInfo.createMoneyInfo(moneyInfos)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
  
}

module.exports = MoneyInfoController
