const Controller = require('egg').Controller
const { getAtSign, setCtxBody, getAccountInfo } = require('../utils')

class AtController extends Controller {
  async atRobot () {
    try {
      const { sign, timestamp } = this.ctx.request.header
      const { appSecret } = await getAccountInfo(this.ctx.request.body, {}, 'dingtalkRobot')
      await AtController.checkIsDingtalk(appSecret, sign, timestamp)
      const res = await this.ctx.service.at.atRobot(this.ctx.request.body)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }

  // 检查消息是否来自钉钉的合法请求
  // https://developers.dingtalk.com/document/app/develop-enterprise-internal-robots/title-cq2-u4g-s7j
  static async checkIsDingtalk (appSecret, sign, timestamp) {
    return new Promise((resolve, reject) => {
      const atSign = getAtSign(appSecret, timestamp)
      if (Math.abs(timestamp - new Date().getTime()) > 60 * 60 * 1000) reject('时间差距大于 1 小时')
      if (sign !== atSign) reject('签名错误')
      resolve()
    })
  }
}

module.exports = AtController
