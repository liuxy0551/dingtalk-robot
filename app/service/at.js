const Service = require('egg').Service
const { sendMsgToGroup, setCtxBody, getDefaultText } = require('../utils')

class AtService extends Service {
  async atRobot (body) {
    try {
      const { content } = body.text
      const { senderStaffId = '', conversationTitle: name = '', sessionWebhook: Webhook = '' } = body

      let key = '', result = undefined
      // 韭零后
      content.includes('我的') && (key = 'myMoney')
      content.includes('股票') && (key = 'gupiao')
      content.includes('基金') && (key = 'jijin')
      content.includes('理财') && !content.includes('我的') && (key = 'money')

      // 财联社
      content.includes('早报') && (key = 'morning')
      content.includes('午报') && (key = 'afternoon')
      content.includes('晚报') && (key = 'evening')

      // 财经报告 - 东方财富
      content.includes('报告') && (key = 'caijingbaogao')

      // 记账啦
      content.includes('账单') && (key = 'jizhangla')
      content.includes('记账') && (key = 'jizhang')

      // 机器资源 https://server.liuxianyu.cn/
      content.includes('机器') && (key = 'serverStatus')

      // 百度统计已停止 API 服务
      content.includes('百度') && (key = 'baidutj')

      // 学习网站
      content.includes('知乎') && (key = 'zhihuhot')
      content.includes('掘金') && (key = 'juejinhot')

      const msg = {
        msgtype: 'text',
        text: {
          content: `已经把【${ content.replace(/^\s*|\s*$/g, '') }】相关的内容发送到专属群里啦，请前往查收。`
        },
        at: {
          atUserIds: [senderStaffId]
        }
      }
      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群

      switch (key) {
        case 'myMoney':
          const myMoneyRes = await this.ctx.service.send.getMyMoneyInfo(body)
          result = setCtxBody(200, myMoneyRes)
          break
        case 'jijin':
          const jijinRes = await this.ctx.service.send.jijin(body)
          result = setCtxBody(200, jijinRes)
          break
        case 'gupiao':
          const gupiaoRes = await this.ctx.service.send.gupiao(body)
          result = setCtxBody(200, gupiaoRes)
          break
        case 'money':
          const jijinResult = await this.ctx.service.send.jijin(body)
          const gupiaoResult = await this.ctx.service.send.gupiao(body)
          result = setCtxBody(200, { ...jijinResult, ...gupiaoResult })
          break
        case 'morning':
          const { morning } = this.app.config.report
          const morningRes = await this.ctx.service.moneyReport.getReports(morning)
          result = setCtxBody(200, morningRes)
          break
        case 'afternoon':
          const { afternoon } = this.app.config.report
          const afternoonRes = await this.ctx.service.moneyReport.getReports(afternoon)
          result = setCtxBody(200, afternoonRes)
          break
        case 'evening':
          const { evening } = this.app.config.report
          const eveningRes = await this.ctx.service.moneyReport.getReports(evening)
          result = setCtxBody(200, eveningRes)
          break
        case 'caijingbaogao':
          // 后续可以考虑再加上财联社的电报 https://www.cls.cn/telegraph
          const dongfangcaifuRes = await this.ctx.service.send.dongfangcaifu(body)
          result = setCtxBody(200, dongfangcaifuRes)
          break
        case 'jizhangla':
          const jizhanglaRes = await this.ctx.service.send.jizhangla(body)
          await AtService.replyGroupAt(msg, this.ctx.service, robots)
          result = setCtxBody(200, jizhanglaRes)
          break
        case 'jizhang':
          const jizhangRes = await this.ctx.service.send.jizhang(body)
          result = setCtxBody(200, jizhangRes)
          break
        case 'serverStatus':
          const serverStatusRes = await this.ctx.service.send.serverStatus(body)
          result = setCtxBody(200, serverStatusRes)
          break
        case 'baidutj':
          const baidutjRes = await this.ctx.service.send.baidutj(body)
          await AtService.replyGroupAt(msg, this.ctx.service, robots)
          result = setCtxBody(200, baidutjRes)
          break
        case 'zhihuhot':
          const zhihuhotRes = await this.ctx.service.send.zhihuhot(body)
          result = setCtxBody(200, zhihuhotRes)
          break
        case 'juejinhot':
          const juejinhotRes = await this.ctx.service.send.juejinhot(body)
          result = setCtxBody(200, juejinhotRes)
          break
        default:
          const defaultText = `@${ body.senderStaffId } ${ getDefaultText }`
          const defaultMsg = {
            msgtype: 'markdown',
            markdown: {
              title: defaultText,
              text: defaultText
            },
            at: {
              atUserIds: [body.senderStaffId]
            }
          }
          const res = await AtService.replyGroupAt(defaultMsg, this.ctx.service, robots)

          result = setCtxBody(200, res)
          break
      }

      return result
    } catch (err) {
      throw(err)
    }
  }

  // 默认在群里回复
  static async replyGroupAt (msg, ctxService, robots) {
    try {
      const res = await sendMsgToGroup(false, msg, ctxService, robots)
      return res
    } catch (err) {
      throw err
    }
  }
}

module.exports = AtService
