const Service = require('egg').Service
const { baidutjAPI, jizhanglaAPI, zhihuhotAPI, juejinhotAPI } = require('../utils/axios')
const { sendMsgToGroup, getTimeStr } = require('../utils')

class SendService extends Service {
  // 百度统计
  async baidutj (config) {
    try {
      const { body } = await baidutjAPI(config)
      const list = body.data[0].result.items

      const yesterday = list[1][0]
      const today = list[1][1]

      const text = `【今日】\n- PV：${ today[0] }\n- UV：${ today[1] }\n- IP数：${ today[2] }\n- 平均访问时长：${ getTimeStr(today[3]) }\n\n【昨日】\n- PV：${ yesterday[0] }\n- UV：${ yesterday[1] }\n- IP数：${ yesterday[2] }\n- 平均访问时长：${ getTimeStr(yesterday[3]) }`
      const msg = {
        msgtype: 'actionCard',
        actionCard: {
          title: '百度统计 - 网站数据',
          text,
          singleTitle: '点此查看更多数据',
          singleURL: `https://tongji.baidu.com/m/#/report/${config.body.siteId}`
        }
      }

      const res = await sendMsgToGroup(msg, this.ctx.service)
      return res
    } catch (err) {
      throw err
    }
  }

  // 记账啦
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

  // 知乎热榜
  async zhihuhot () {
    try {
      const list = await zhihuhotAPI()
      let text = '知乎热榜 Top 10\n\n'
      for (let i = 0; i < list.length; i++) {
        text += `${ i + 1 }、[${ list[i].title }](${ list[i].url })\n\n`
      }

      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: '知乎热榜 Top 10',
          text
        }
      }

      const res = await sendMsgToGroup(msg, this.ctx.service)
      return res
    } catch (err) {
      throw err
    }
  }

  // 掘金前端七天热榜
  async juejinhot () {
    try {
      const list = await juejinhotAPI()
      let text = '掘金前端七天热榜 Top 10\n\n'
      for (let i = 0; i < list.length; i++) {
        text += `${ i + 1 }、[${ list[i].title }](${ list[i].url })\n\n`
      }

      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: '掘金前端七天热榜 Top 10',
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
