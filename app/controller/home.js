const Controller = require('egg').Controller
const { getVersion } = require('../utils')

class HomeController extends Controller {
  async check () {
    console.log(`dingtalk-robot v${ getVersion() }`)
    this.ctx.body = `dingtalk-robot v${ getVersion() }`
  }
}

module.exports = HomeController
