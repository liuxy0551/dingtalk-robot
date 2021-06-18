const axios = require('axios')
const { getNow } = require('./utils')

exports.handler = (event, context, callback) => {
  // jijin 基金, gupiao 股票, baidutj 百度统计, jizhangla 记账啦, zhihuhot 知乎热榜, juejinhot 掘金热榜
  const urlList = ['http://dingtalk-robot.liuxianyu.cn/api/jizhangla']

  for (let url of urlList) {
    console.log(`${ getNow() }, ${ url }`)
    
    let msg
    axios.post(url).then(res => {
      msg = `success, ${ getNow() }, ${ JSON.stringify(res.data) }`
    }).catch(err => {
      msg = `failed, ${ getNow() }, ${ err.response.status }`
    }).finally(() => {
      console.log(msg)
      callback(null, msg)
    })
  }
}
