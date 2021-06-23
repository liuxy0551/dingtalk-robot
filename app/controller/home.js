const Controller = require('egg').Controller

class HomeController extends Controller {
  async check () {
    console.log('dingtalk-robot v1.0.0')
    this.ctx.body = 'dingtalk-robot v1.0.0'
  }
}

module.exports = HomeController
