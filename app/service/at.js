const Service = require('egg').Service
const { sendMsgToGroup, setCtxBody } = require('../utils')

class AtService extends Service {
  async atRobot (body) {
    try {
      const { content } = body.text
      let key = '', result = undefined
      content.includes('记账') && (key = 'jizhangla')
      content.includes('百度') && (key = 'baidutj')
      content.includes('知乎') && (key = 'zhihuhot')
      content.includes('掘金') && (key = 'juejinhot')

      const msg = {
        msgtype: 'text',
        text: {
          content: `已经把【${ content }】相关的内容发送到指定群里啦，请前往查收。`
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
        case 'jizhangla':
          const jizhanglaRes = await this.ctx.service.send.jizhangla(this.app.config.jizhangla)
          await AtService.replyGroupAt(msg, this.ctx.service, [robot])
          result = setCtxBody(200, jizhanglaRes)
          break
        case 'baidutj':
          const baidutjRes = await this.ctx.service.send.baidutj(this.app.config.baidutj)
          await AtService.replyGroupAt(msg, this.ctx.service, [robot])
          result = setCtxBody(200, baidutjRes)
          break
        case 'zhihuhot':
          const zhihuhotRes = await this.ctx.service.send.zhihuhot()
          await AtService.replyGroupAt(msg, this.ctx.service, [robot])
          result = setCtxBody(200, zhihuhotRes)
          break
        case 'juejinhot':
          const juejinhotRes = await this.ctx.service.send.juejinhot()
          await AtService.replyGroupAt(msg, this.ctx.service, [robot])
          result = setCtxBody(200, juejinhotRes)
          break
        default:
          const defaultText = '抱歉，我还不明白您的问题，您可以这样问我：\n- 百度统计 \n - 记账啦 \n - 知乎热榜 \n - 掘金热榜'
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
