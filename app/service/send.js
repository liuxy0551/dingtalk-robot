const Service = require('egg').Service
const { baidutjAPI, jizhanglaAPI } = require('../utils/axios')
const { sendMsgToGroup, getTimeStr } = require('../utils')

class SendService extends Service {
  async baidutj (config) {
    try {
      const { body } = await baidutjAPI(config)
      const list = body.data[0].result.items

      const yesterday = list[1][0]
      const today = list[1][1]

      const text = `【今日】\n- PV：${ today[0] }\n- UV：${ today[1] }\n- IP数：${ today[2] }\n- 平均访问时长：${ getTimeStr(today[3]) }\n\n【昨日】\n- PV：${ yesterday[0] }\n- UV：${ yesterday[1] }\n- IP数：${ yesterday[2] }\n- 平均访问时长：${ getTimeStr(yesterday[3]) }`
      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: '百度统计 - 网站数据',
          text
        }
      }

      const res = await sendMsgToGroup(msg, this.ctx.service)
      return res
    } catch (err) {
      throw err
    }
  }

  async jizhangla (config) {
    try {
      const list = await jizhanglaAPI(config)
      let text = ''
      for (let i of list) {
        text += `【${ i.name }】\n- 支出：${ i.expense }元\n- 收入：${ i.income }元\n\n`
      }
      // text += `微信扫码体验：\n![](https://a.jizhangla.liuxianyu.cn/assets/media/share.jpg)`
      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: '记账啦 - 昨日、本月账单',
          text
        }
      }

      const res = await sendMsgToGroup(msg, this.ctx.service)
      return res
    } catch (err) {
      throw err
    }
  }
}

module.exports = SendService
