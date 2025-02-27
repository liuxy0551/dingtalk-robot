/**
 * @description: 各类发送请求
 */
const axios = require("axios")
const http = require('http')
const iconv = require('iconv-lite')
const BufferHelper = require('bufferhelper')
const { getUuid, getDate } = require('../utils')

// 理财 - 基金
// https://gitee.com/base/leek-fund/blob/master/development.md
const jijinAPI = async (jijinList) => {
  const apiUrl = `https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=20&appType=ttjj&product=EFund&plat=Android&deviceid=${ getUuid() }&Version=1&Fcodes=${ jijinList.map(item => item.code).join(',') }`

  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then(res => {
      resolve(res.data.Datas || [])
    }).catch(err => {
      reject(err)
    })
  })
}

// 理财 - 天天基金股票
// https://gitee.com/base/leek-fund/blob/master/development.md
const gupiaoTTAPI = async (gupiaoList) => {
  const apiUrl = `https://push2.eastmoney.com/api/qt/ulist.np/get?fields=f2,f3,f14&secids=${ gupiaoList.map(item => item.code).join(',') }`

  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then(res => {
      resolve(res.data.data.diff)
    }).catch(err => {
      reject(err)
    })
  })
}

// 理财 - 新浪关键词查询
// http://suggest3.sinajs.cn/suggest/key=changan&name=callbackCode`
const getMoneyInfoBySinaAPI = async (key) => {
  const apiUrl = `http://suggest3.sinajs.cn/suggest/key=${ encodeURI(key) }&name=callbackCode`

  return new Promise((resolve, reject) => {
    const url = require('url').parse(apiUrl)
    http.get(url, (res) => {
      const bufferHelper = new BufferHelper()
      res.on('data', (chunk) => {
        bufferHelper.concat(chunk)
      })
      res.on('end', () => {
        const res = iconv.decode(bufferHelper.toBuffer(), 'GBK')
        resolve(res)
      })
      res.on('error', (err) => {
        console.error('getMoneyInfoBySinaAPI', err)
        reject()
      })
    })
  })
}

// 理财 - 腾讯股票
// http://qt.gtimg.cn/q=sz000625,sh600519
const gupiaoTencentAPI = async (gupiaoList) => {
  const apiUrl = `http://qt.gtimg.cn/q=${ gupiaoList.map(item => item.code).join(',') }`

  return new Promise((resolve, reject) => {
    const url = require('url').parse(apiUrl)
    http.get(url, (res) => {
      const bufferHelper = new BufferHelper()
      res.on('data', (chunk) => {
        bufferHelper.concat(chunk)
      })
      res.on('end', () => {
        const res = iconv.decode(bufferHelper.toBuffer(), 'GBK')
        let list = [], arr = res.split(';')
        for (let i = 0; i < arr.length; i++) {
          arr[i].split('~').length > 33 && list.push({
            name: arr[i].split('~')[1],
            // name: gupiaoList[i].name,
            nowPrice: arr[i].split('~')[3],
            range: arr[i].split('~')[32]
          })
        }
        resolve(list)
      })
      res.on('error', (err) => {
        console.error('gupiaoTencentAPI', err)
        reject()
      })
    })
  })
}

// ServerStatus
// https://server.liuxianyu.cn/
const serverStatusAPI = async () => {
  const apiUrl = `https://server.liuxianyu.cn/json/stats.json`

  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then(res => {
      resolve(res.data.servers)
    }).catch(err => {
      reject(err)
    })
  })
}

// 理财 - 东方财富财经报告
// https://kuaixun.eastmoney.com/
const dongfangcaifuAPI = async () => {
  const apiUrl = `https://np-weblist.eastmoney.com/comm/web/getFastNewsList?client=web&biz=web_724&fastColumn=102&sortEnd=&pageSize=10&req_trace=${new Date().getTime()}`

  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then(res => {
      resolve(res.data?.data?.fastNewsList)
    }).catch(err => {
      reject(err)
    })
  })
}

// 百度统计
const baidutjAPI = async (config) => {
  const { apiUrl, header, body } = config
  const params = {
    header,
    body: {
      ...body,
      start_date: getDate(-1),
      end_date: getDate(),
    }
  }

  return new Promise((resolve, reject) => {
    axios.post(apiUrl, params).then(res => {
      const desc = res.data.header.desc
      desc === 'success' ? resolve(res.data) : reject(desc)
    }).catch(err => {
      reject(err)
    })
  })
}

// 记账啦 - 新增账单
const createBillByDingTalkRobotAPI = async (config, data) => {
  const { createBillByDingTalkRobot: apiUrl, userId } = config

  return new Promise((resolve, reject) => {
    axios.post(apiUrl, { userId, ...data }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 记账啦 - 查询昨日、本月账单
const getTotalAmountByUserIdAPI = async (config) => {
  const { getTotalAmountByUserId: apiUrl, userId } = config

  return new Promise((resolve, reject) => {
    axios.post(apiUrl, { userId }).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 知乎热榜
const zhihuhotAPI = async () => {
  const apiUrl = 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true'

  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then(res => {
      const list = res.data.data.slice(0, 10).map(item => {
        return {
          title: item.target.title,
          url: `https://www.zhihu.com/question/${item.target.id}`,
        }
      })
      resolve(list)
    }).catch(err => {
      reject(err)
    })
  })
}

// 掘金前端七天热榜
const juejinhotAPI = async () => {
  const apiUrl = 'https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed'
  const params = {
    cate_id: '6809637767543259144',
    cursor: '0',
    id_type: 2,
    limit: 10,
    sort_type: 7
  }

  return new Promise((resolve, reject) => {
    axios.post(apiUrl, params).then(res => {
      const list = res.data.data.map(item => {
        return {
          title: item.article_info.title,
          url: `https://juejin.cn/post/${item.article_id}`,
        }
      })
      resolve(list)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  jijinAPI,
  gupiaoTTAPI,
  getMoneyInfoBySinaAPI,
  gupiaoTencentAPI,
  createBillByDingTalkRobotAPI,
  getTotalAmountByUserIdAPI,
  serverStatusAPI,
  dongfangcaifuAPI,
  baidutjAPI,
  zhihuhotAPI,
  juejinhotAPI
}
