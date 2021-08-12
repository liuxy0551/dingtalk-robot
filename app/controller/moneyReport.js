/**
 * 财联社 报告
 * https://www.cls.cn/subject
 */
const Controller = require('egg').Controller
const { setCtxBody } = require('../utils')

class MoneyReportController extends Controller {
  // 早报列表
  async getMorningReports () {
    try {
      const res = await this.ctx.service.moneyReport.getMorningReports()
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
  
  // 午报列表
  async getAfternoonReports () {
    try {
      const res = await this.ctx.service.moneyReport.getAfternoonReports()
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
  
  // 晚报列表
  async getEveningReports () {
    try {
      const res = await this.ctx.service.moneyReport.getEveningReports()
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
}

module.exports = MoneyReportController
