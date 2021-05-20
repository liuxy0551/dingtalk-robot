const Controller = require('egg').Controller
const { getAtSign, setCtxBody } = require('../utils')

class AtController extends Controller {
  async atRobot () {
    try {
      const { sign, timestamp } = this.ctx.request.header
      await checkFrom(sign, timestamp)
      const res = await this.ctx.service.at.atRobot(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  async checkFrom (sign, timestamp) {
    return new Promise((resolve, reject) => {
      const atSign = getAtSign(this.app.config.atConfig.appSecret, timestamp)
      if (Math.abs(timestamp - new Date().getTime()) > 60 * 60 * 1000) reject('时间差距大于 1 小时')
      if (sign !== atSign) reject('签名错误')
      resolve()
    })
  }
}

module.exports = AtController
