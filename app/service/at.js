const Service = require('egg').Service
const { sendMsgToGroup, getTimeStr } = require('../utils')

class AtService extends Service {
  atRobot () {
    return new Promise(async (resolve, reject) => {
      try {
        const { body } = await baidutjAPI(config)
        const list = body.data[0].result.items

        const yesterday = list[1][0]
        const today = list[1][1]

        const text = `【今日】\n- PV：${ today[0] }\n- UV：${ today[1] }\n- IP数：${ today[2] }\n- 平均访问时长：${ getTimeStr(today[3]) }\n\n【昨日】\n- PV：${ yesterday[0] }\n- UV：${ yesterday[1] }\n- IP数：${ yesterday[2] }\n- 平均访问时长：${ getTimeStr(yesterday[3]) }`
        const msg = {
          msgtype: 'markdown',
          markdown: {
            title: '网站流量数据',
            text
          }
        }

        const res = await sendMsgToGroup(msg, this.ctx.service)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = AtService
