const Service = require('egg').Service
const { sendMsgToGroup, setCtxBody, getVersion } = require('../utils')

class AtService extends Service {
  async atRobot (body) {
    try {
      const { content } = body.text
      let key = '', result = undefined
      content.includes('我的') && (key = 'myMoney')
      content.includes('基金') && (key = 'jijin')
      content.includes('股票') && (key = 'gupiao')
      content.includes('理财') && !content.includes('我的') && (key = 'money')
      content.includes('记账') && (key = 'jizhangla')
      content.includes('百度') && (key = 'baidutj')
      content.includes('知乎') && (key = 'zhihuhot')
      content.includes('掘金') && (key = 'juejinhot')

      const msg = {
        msgtype: 'text',
        text: {
          content: `已经把【${ content.replace(/^\s*|\s*$/g, '') }】相关的内容发送到指定群里啦，请前往查收。`
        },
        at: {
          atUserIds: [body.senderStaffId]
        }
      }
      const robot = {
        name: body.conversationTitle,
        Webhook: body.sessionWebhook
      }

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
        case 'jizhangla':
          const jizhanglaRes = await this.ctx.service.send.jizhangla()
          // await AtService.replyGroupAt(msg, this.ctx.service, [robot])
          result = setCtxBody(200, jizhanglaRes)
          break
        case 'baidutj':
          const baidutjRes = await this.ctx.service.send.baidutj()
          // await AtService.replyGroupAt(msg, this.ctx.service, [robot])
          result = setCtxBody(200, baidutjRes)
          break
        case 'zhihuhot':
          const zhihuhotRes = await this.ctx.service.send.zhihuhot()
          result = setCtxBody(200, zhihuhotRes)
          break
        case 'juejinhot':
          const juejinhotRes = await this.ctx.service.send.juejinhot()
          result = setCtxBody(200, juejinhotRes)
          break
        default:
          const defaultText = `抱歉，不明白您的问题，您可以这样问：\n - 我的理财 \n - 基金 \n - 股票 \n - 理财(同时查询基金、股票) \n - 知乎热榜 \n - 掘金前端热榜 \n\n当前版本: v${ getVersion() }`
          const defaultMsg = {
            msgtype: 'markdown',
            markdown: {
              title: defaultText,
              text: defaultText
            }
          }
          const res = await AtService.replyGroupAt(defaultMsg, this.ctx.service, [robot])

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
      const res = await sendMsgToGroup(msg, ctxService, robots)
      return res
    } catch (err) {
      throw err
    }
  }
}

module.exports = AtService
