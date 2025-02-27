const Controller = require('egg').Controller
const { sendMsgToGroup, setCtxBody } = require('../utils')

class SendController extends Controller {
  async sendMsg () {
    try {
      const { msg, isDev, conversationTitle: name = '', sessionWebhook: Webhook = '' } = this.ctx.request.body
      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 理财 - 基金
  async jijin () {
    try {
      const res = await this.ctx.service.send.jijin(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 理财 - 股票
  async gupiao () {
    try {
      const res = await this.ctx.service.send.gupiao(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 理财 - 财经报告
  async caijingbaogao () {
    try {
      const res = await this.ctx.service.send.caijingbaogao(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 记账啦 - 查询昨日、本月账单
  async jizhangla () {
    try {
      const res = await this.ctx.service.send.jizhangla(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 百度统计
  async baidutj () {
    try {
      const res = await this.ctx.service.send.baidutj(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 知乎热榜
  async zhihuhot () {
    try {
      const res = await this.ctx.service.send.zhihuhot(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 掘金前端七天热榜
  async juejinhot () {
    try {
      const res = await this.ctx.service.send.juejinhot(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
}

module.exports = SendController
