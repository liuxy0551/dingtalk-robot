/**
 * @description: 各类发送请求
 */
const axios = require("axios")
const { getDate } = require('./index')
const { getUuid } = require('../utils')

// 理财 - 基金
// https://gitee.com/base/leek-fund/blob/master/development.md
const jijinAPI = async (jijinList) => {
  const apiUrl = `https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=20&appType=ttjj&product=EFund&plat=Android&deviceid=${ getUuid() }&Version=1&Fcodes=${ jijinList.map(item => item.code).join(',') }`
  
  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then(res => {
      resolve(res.data.Datas)
    }).catch(err => {
      reject(err)
    })
  })
}

// 理财 - 股票
// https://gitee.com/base/leek-fund/blob/master/development.md
const gupiaoAPI = async (gupiaoList) => {
  const apiUrl = `https://push2.eastmoney.com/api/qt/ulist.np/get?fields=f2,f3,f14&secids=${ gupiaoList.map(item => item.code).join(',') }`
  
  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then(res => {
      resolve(res.data.data.diff)
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

// 记账啦
const jizhanglaAPI = async (config) => {
  const { apiUrl, userId } = config
  
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
  gupiaoAPI,
  jizhanglaAPI,
  baidutjAPI,
  zhihuhotAPI,
  juejinhotAPI
}
