const axios = require('axios')
const { getNow } = require('./utils')

exports.handler = (event, context, callback) => {
  const url = 'http://dingtalk-robot.liuxianyu.cn/api/baidutj'
  // const url = 'http://dingtalk-robot.liuxianyu.cn/api/jizhangla'
  
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
