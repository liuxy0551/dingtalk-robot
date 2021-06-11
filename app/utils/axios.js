/**
 * @description: 各类发送请求
 */
const axios = require("axios")
const { getDate } = require('./index')

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
const zhihuhotAPI = async (config) => {
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

module.exports = {
  baidutjAPI,
  jizhanglaAPI,
  zhihuhotAPI
}
