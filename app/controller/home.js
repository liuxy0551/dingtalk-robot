const Controller = require('egg').Controller

class HomeController extends Controller {
  async check () {
    console.log('hello fc')
    this.ctx.body = 'hello fc'
  }
}

module.exports = HomeController
