const Service = require('egg').Service
const { jijinAPI, gupiaoTTAPI, gupiaoTencentAPI, dongfangcaifuAPI, serverStatusAPI, createBillByDingTalkRobotAPI, getTotalAmountByUserIdAPI, baidutjAPI, zhihuhotAPI, juejinhotAPI } = require('../utils/axios')
const { sendMsgToGroup, getTimeStr, getNow, getColorNum, getAccountInfo, getDefaultText, moneyInfoPicUrl } = require('../utils')

class SendService extends Service {
  // 我的理财信息
  async getMyMoneyInfo ({ senderNick, senderId, senderStaffId, isDev, conversationTitle: name = '', sessionWebhook: Webhook = '' }) {
    try {
      const msg = {
        msgtype: 'link',
        link: {
          title: `『${ senderNick }』的理财信息`,
          text: `点击查看更多『${ senderNick }』的理财信息`,
          picUrl: moneyInfoPicUrl,
          messageUrl: `http://dingtalk-robot.liuxianyu.cn/web/index.html#/auth?senderId=${ senderId }&senderNick=${ senderNick }`
        }
      }

      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots)
      return res
    } catch (err) {
      throw err
    }
  }

  // 理财 - 基金
  async jijin ({ senderNick, senderId, senderStaffId, isTimedTask = false, isDev, conversationTitle: name = '', sessionWebhook: Webhook = '' }) {
    try {
      let msg
      const { jijin } = await this.ctx.service.moneyInfo.getMoneyInfos({ senderId }, ['jijin'])
      if (jijin && jijin.length) {
        const list = await jijinAPI(jijin)
        let text = `@${ senderStaffId } 当前时间：${ getNow() }\n\n`
        for (let i = 0; i < list.length; i++) {
          text += `${ i + 1 }、【${ list[i].SHORTNAME }】\n\n 预估：${ getColorNum('%', list[i].GSZZL) }，昨日：${ getColorNum('%', list[i].NAVCHGRT) }\n\n`
        }
        text += '数据来源：天天基金'
        msg = {
          msgtype: 'markdown',
          markdown: {
            title: '韭零后 - 基金',
            text
          },
          at: {
            atUserIds: [senderStaffId]
          }
        }
      } else {
        msg = isTimedTask ? null : {
          msgtype: 'text',
          text: {
            content: `您还没有添加基金信息，可以先和我说 “我的理财”，点击链接添加信息后再查询`
          },
          at: {
            atUserIds: [senderStaffId]
          }
        }
      }

      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots)
      return res
    } catch (err) {
      throw err
    }
  }

  // 理财 - 股票
  async gupiao ({ senderNick, senderId, senderStaffId, isTimedTask = false, isDev, conversationTitle: name = '', sessionWebhook: Webhook = '' }) {
    try {
      let msg
      const { gupiao } = await this.ctx.service.moneyInfo.getMoneyInfos({ senderId }, ['gupiao'])
      if (gupiao && gupiao.length) {
        // 天天基金 - 查询股票
        // const list = await gupiaoTTAPI(gupiao)
        // let text = `昵称: ${ senderNick }\n\n 当前时间：${ getNow() }\n\n`
        // for (let i = 0; i < list.length; i++) {
        //   text += `${ i + 1 }、【${ list[i].f14 }】\n\n 最新价：${ getColorNum('', (list[i].f2 / 100).toFixed(2), (list[i].f3 / 100).toFixed(2)) }，涨幅：${ getColorNum('%', (list[i].f3 / 100).toFixed(2)) }\n\n`
        // }
        // text += '数据来源：天天基金'

        // 腾讯 - 查询股票
        const list = await gupiaoTencentAPI(gupiao)
        let text = `@${ senderStaffId } 当前时间：${ getNow() }\n\n`
        for (let i = 0; i < list.length; i++) {
          text += `${ i + 1 }、【${ list[i].name }】\n\n 最新价：${ getColorNum('', list[i].nowPrice, list[i].range) }，涨幅：${ getColorNum('%', list[i].range) }\n\n`
        }
        text += '数据来源：腾讯'

        msg = {
          msgtype: 'markdown',
          markdown: {
            title: '韭零后 - 股票',
            text
          },
          at: {
            atUserIds: [senderStaffId]
          }
        }
      } else {
        msg = isTimedTask ? null : {
          msgtype: 'text',
          text: {
            content: `您还没有添加股票信息，可以先和我说 “我的理财”，添加信息后再查询`
          },
          at: {
            atUserIds: [senderStaffId]
          }
        }
      }

      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots)
      return res
    } catch (err) {
      throw err
    }
  }

  // 记账啦 - 新增账单
  async jizhang ({ senderStaffId, conversationTitle: name = '', sessionWebhook: Webhook = '', isDev }) {
    const robots = Webhook ? [{ name, Webhook }] : [] // 当前群

    try {
      const { body } = this.ctx.request
      const jizhanglaConfig = await getAccountInfo(body, this.app.config.jizhangla, 'jizhangla')
      const { content } = body.text
      const [accountTypeName, amount = 0, note = ''] = content.split(' ').filter(item => item !== '' && item !== '记账')
      const jizhangRes = await createBillByDingTalkRobotAPI(jizhanglaConfig, { accountTypeName, amount, note })

      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: `记账啦 - 记账${ jizhangRes.code === 200 ? '成功' : '失败' }`,
          text: `【记账${ jizhangRes.code === 200 ? '成功' : '失败' }】\n\n` + (jizhangRes.code === 200 ? (`分类：${ accountTypeName }\n\n金额：${ amount }元` + (note ? `\n\n备注：${ note }` : '')) : jizhangRes.data.replace('Error: ', ''))
        }
      }

      // 记账成功
      jizhangRes.code === 200 && console.log('记账啦 - 新增账单 来自钉小弟', jizhangRes)
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots, senderStaffId)
      return res
    } catch (err) {
      if (err === 404) {
        await SendService.sendNotFound(this.ctx.service, robots, senderStaffId)
      }
      throw err
    }
  }

  // 记账啦 - 查询昨日、本月账单
  async jizhangla ({ senderStaffId, conversationTitle: name = '', sessionWebhook: Webhook = '', isDev }) {
    const robots = Webhook ? [{ name, Webhook }] : [] // 当前群

    try {
      const jizhanglaConfig = await getAccountInfo(this.ctx.request.body, this.app.config.jizhangla, 'jizhangla')
      const list = await getTotalAmountByUserIdAPI(jizhanglaConfig)
      let text = ``
      for (let i of list) {
        text += `【${ i.name }】\n- 支出：${ `<font color=#007500>${ i.expense }</font>` }元\n- 收入：${ `<font color=#ff0000>${ i.income }</font>` }元\n\n`
      }
      // text += `微信扫码体验：\n![](https://a.jizhangla.liuxianyu.cn/assets/media/share.jpg)`
      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: '记账啦 - 昨日、本月账单',
          text
        }
      }

      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots, senderStaffId)
      return res
    } catch (err) {
      if (err === 404) {
        await SendService.sendNotFound(this.ctx.service, robots, senderStaffId)
      }
      throw err
    }
  }

  // 机器资源 https://server.liuxianyu.cn/
  async serverStatus ({ isDev, conversationTitle: name = '', sessionWebhook: Webhook = '' }) {
    try {
      const list = await serverStatusAPI()
      let text = '机器资源概览\n\n'
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        text += `[${ item.name }] CPU: ${item.cpu}% 内存: ${Math.ceil((item.memory_used / item.memory_total) * 100)}% 磁盘: ${Math.ceil((item.hdd_used / item.hdd_total) * 100)}% ${item.uptime}\n\n`;
      }
      text += '数据来源：[ServerStatus](https://server.liuxianyu.cn/)'

      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: '机器资源概览',
          text
        }
      }

      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots)
      return res
    } catch (err) {
      throw err
    }
  }

  // 百度统计
  async baidutj ({ senderStaffId, conversationTitle: name = '', sessionWebhook: Webhook = '', isDev }) {
    const robots = Webhook ? [{ name, Webhook }] : [] // 当前群

    try {
      const baidutjConfig = await getAccountInfo(this.ctx.request.body, this.app.config.baidutj, 'baidutj')
      const { body } = await baidutjAPI(baidutjConfig)
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
          singleURL: `https://tongji.baidu.com/m/#/report/${baidutjConfig.body.siteId}`
        }
      }

      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots, senderStaffId)
      return res
    } catch (err) {
      if (err === 404) {
        await SendService.sendNotFound(this.ctx.service, robots, senderStaffId)
      }
      throw err
    }
  }

  // 财经报告 - 东方财富
  async dongfangcaifu ({ isDev, conversationTitle: name = '', sessionWebhook: Webhook = '' }) {
    try {
      const list = await dongfangcaifuAPI()
      let text = '全球财经快讯 Top 10\n\n'
      for (let i = 0; i < list.length; i++) {
        text += `${ i + 1 }、[${ list[i].title }](https://finance.eastmoney.com/a/${list[i].code}.html)\n\n`
      }
      text += '数据来源：[东方财富网 - 全球财经快讯](https://kuaixun.eastmoney.com/)'

      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: '全球财经快讯 Top 10',
          text
        }
      }

      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots)
      return res
    } catch (err) {
      throw err
    }
  }

  // 知乎热榜
  async zhihuhot ({ isDev, conversationTitle: name = '', sessionWebhook: Webhook = '' }) {
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

      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots)
      return res
    } catch (err) {
      throw err
    }
  }

  // 掘金前端七天热榜
  async juejinhot ({ isDev, conversationTitle: name = '', sessionWebhook: Webhook = '' }) {
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

      const robots = Webhook ? [{ name, Webhook }] : [] // 当前群
      const res = await sendMsgToGroup(isDev, msg, this.ctx.service, robots)
      return res
    } catch (err) {
      throw err
    }
  }

  // 没有账号的用户查询百度统计、记账啦
  static async sendNotFound (isDev, service, robots, senderStaffId) {
    try {
      const msg = {
        msgtype: 'markdown',
        markdown: {
          title: '没有查询到您的信息',
          text: `@${ senderStaffId } 没有查询到您的信息，${ getDefaultText }`
        },
        at: {
          atUserIds: [senderStaffId]
        }
      }
      const res = await sendMsgToGroup(isDev, msg, service, robots)
      return res
    } catch (err) {
      throw err
    }
  }
}

module.exports = SendService
