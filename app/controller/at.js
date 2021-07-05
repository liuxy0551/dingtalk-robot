const Controller = require('egg').Controller
const { setCtxBody } = require('../utils')

class AtController extends Controller {
  // http://dingtalk-robot.liuxianyu.cn/api/atRobot
  async atRobot () {
    try {
      const res = await this.ctx.service.at.atRobot(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
}

module.exports = AtController
