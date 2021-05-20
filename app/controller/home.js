const Controller = require('egg').Controller

class HomeController extends Controller {
  async check () {
    console.log('hello faas')
    this.ctx.body = 'hello faas'
  }
}

module.exports = HomeController
