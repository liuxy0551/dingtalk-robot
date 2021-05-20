const Controller = require('egg').Controller
const { sendMsgToGroup, setCtxBody } = require('../utils')

class SendController extends Controller {
  async sendMsg () {
    try {
      const { msg } = this.ctx.request.body
      const res = await sendMsgToGroup(msg, this.ctx.service)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 百度统计
  async baidutj () {
    try {
      const res = await this.ctx.service.send.baidutj(this.app.config.baidutj)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 记账啦
  async jizhangla () {
    try {
      const res = await this.ctx.service.send.jizhangla(this.app.config.jizhangla)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
}

module.exports = SendController
