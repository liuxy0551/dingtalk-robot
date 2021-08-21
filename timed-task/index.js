const http = require('http')
const { getNow } = require('./utils')

exports.handler = (event, context, callback) => {
    http.get('http://dingtalk-robot.liuxianyu.cn', (data) => {
        let str = ''
        data.on('data', (chunk) => {
            str+=chunk;//监听数据响应，拼接数据片段
        })
        data.on('end', () => {
            console.log(getNow(), str.toString())
            callback()
        })
    })
}

// 0 0/2 1,6 ? * MON-FRI
// 或 每两分钟
