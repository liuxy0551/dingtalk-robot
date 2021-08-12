const Service = require('egg').Service
const https = require('https')
const cheerio = require('cheerio')
const { sendMsgToGroup, reportPicUrl } = require('../utils')

class MoneyReportService extends Service {
  // 早报列表
  async getMorningReports () {
    const url = 'https://www.cls.cn/subject/1151'
    https.get(url, res => {
      // 分段返回的 自己拼接
      let html = ''
  
      // 有数据产生的时候 拼接
      res.on('data', chunk => {
        html += chunk
      })
  
      // 拼接完成
      res.on('end', async () => {
        let $ = cheerio.load(html)
        const { title, url: messageUrl } = MoneyReportService.getParamsFromStr($('.subject-interest-title').eq(0).find("a").toString())
        const text = MoneyReportService.getDescFromStr($('.subject-interest-brief').eq(0).toString())
        const msg = {
          msgtype: 'link',
          link: {
            title,
            text,
            picUrl: reportPicUrl,
            messageUrl
          }
        }

        const res = await sendMsgToGroup(this.ctx.request.body.isDev, msg, this.ctx.service)
        return res
      })
    }).on('error', (err) => {
      throw err
    })
  }

  // 从 a 标签的字符串中拿出参数
  static getParamsFromStr = (str) => {
    return {
      title: str.split('">')[1].split('</a>')[0],
      url: `https://www.cls.cn/detail/${ str.split('href="/detail/')[1].split('" target')[0] }`
    }
  }

  // 从 div 标签中拿出参数
  static getDescFromStr = (str) => {
    return str.split('brief">')[1].split('</div>')[0]
  }
}

module.exports = MoneyReportService
