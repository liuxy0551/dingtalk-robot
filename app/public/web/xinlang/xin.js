/*
 * 利用新浪股票频道的js进行股票查询
 * @code 必填 {Number,String} 用户输入的股票拼音/名称/代码
 * @fn 必填 {Fn} 参数只有1个,是个数组,数组里有对象,对象形如{code: "000725", symbol: "sz000725", name: "京东方A"}
 * @region 选填 {String(enum)} 市场区域 hs==沪深(默认值) hk=港股 usa==美股 all==所有市场
*/
function getSinaStk(code, fn, region) {
  //该变量接收的字符串将会被eval转换成变量
  var callbackName = 'callbackCode'
  var marketList = { "hs": "11,12,13,14,15", "hk": "31,32", "usa": "41,42", "all": "" }
  var marketNum
  if (region && (region.toLowerCase() in marketList)) {
    marketNum = marketList[region]
  } else {
    marketNum = marketList.hs
  }
  code = code.toLowerCase()
  var url = 'http://suggest3.sinajs.cn/suggest/type=' + marketNum + '&key=' + code + '&name=' + callbackName
  var s = document.createElement('script')
  s.src = url
  document.body.appendChild(s)
  s.remove()
  //纯数字,纯字母,纯中文,纯中文+字母才可通过
  var codeBoolean = /(^\d+$|^[a-zA-Z]+$|^[\u4e00-\u9fa5]+$|^[a-zA-Z\u4e00-\u9fa5]+$)/.test(code)
  if (codeBoolean) {
    s.onload = function () {
      //eval(callbackName)将字符串转成变量,即原本字符串callbackCode已变成名为callbackCode的变量
      var arrRes = eval(callbackName);//把从新浪获得的变量值赋给arrRes以便后续操作
      var result = []
      if (arrRes) {
        var arrStk = arrRes.split(';')
        arrStk.forEach(function (v) {
          v = v.split(',')
          console.log(1111, v)
          var obj = {}
          obj.code = v[2]
          obj.symbol = v[3]
          obj.name = v[6]
          result.push(obj)
        })
        fn(result)
      } else {
        fn([])
      }
    }
    s.onerror = function () {
      fn([])
    }
  } else {
    fn([])
  }
}
