const Controller = require('egg').Controller
const { getMoneyInfoBySinaAPI } = require('../utils/axios')
const { getUuid, setCtxBody } = require('../utils')

class MoneyInfoController extends Controller {
  // 获取理财信息列表
  async getMoneyInfos () {
    try {
      const res = await this.ctx.service.moneyInfo.getMoneyInfos(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 新增理财信息
  async createMoneyInfo () {
    try {
      const { senderId, type, name, code, sort } = this.ctx.request.body
      const res = await this.ctx.service.moneyInfo.createMoneyInfo({ moneyInfoId: getUuid(), senderId, type, name, code, sort })
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 理财信息排序
  async sortMoneyInfo () {
    try {
      const { current, target } = this.ctx.request.body
      const res = await this.ctx.service.moneyInfo.sortMoneyInfo(current, target)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 删除理财信息
  async deleteMoneyInfo () {
    try {
      const { senderId, code } = this.ctx.request.body
      const res = await this.ctx.service.moneyInfo.deleteMoneyInfo(senderId, code)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 新浪关键词查询
  async getMoneyInfoBySina () {
    try {
      const { key = '' } = this.ctx.request.body
      const res = await getMoneyInfoBySinaAPI(key)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
}

module.exports = MoneyInfoController
