const Controller = require('egg').Controller

class HomeController extends Controller {
  async check () {
    console.log('hello dingtalk-robot')
    this.ctx.body = 'hello dingtalk-robot'
  }
}

module.exports = HomeController
