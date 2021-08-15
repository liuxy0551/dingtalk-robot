/**
 * 财联社 财经报告
 * https://www.cls.cn/subject
 */
const Controller = require('egg').Controller
const { setCtxBody } = require('../utils')

class MoneyReportController extends Controller {
  // 早报列表
  async getMorningReports () {
    try {
      const { morning } = this.app.config.report
      const res = await this.ctx.service.moneyReport.getReports(morning)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
  
  // 午报列表
  async getAfternoonReports () {
    try {
      const { afternoon } = this.app.config.report
      const res = await this.ctx.service.moneyReport.getReports(afternoon)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
  
  // 晚报列表
  async getEveningReports () {
    try {
      const { evening } = this.app.config.report
      const res = await this.ctx.service.moneyReport.getReports(evening)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
}

module.exports = MoneyReportController
