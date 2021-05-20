/**
 * 定时任务
 */

const Subscription = require('egg').Subscription
const { getNow } = require('../utils')

class BaiduTongji extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '60s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
      // const res = await this.ctx.service.send.baidutj(this.app.config.baidutj)
      // console.log(getNow())
    }
}
 
 module.exports = BaiduTongji
