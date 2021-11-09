import config from '../../package.json'

// 检查设备类型
const getDevice = () => {
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let device = 'pc'
  for (let i of Agents) {
    if (navigator.userAgent.indexOf(i) !== -1) {
      device = 'mobile'
      break
    }
  }
  return device
}

// 改变显示的样式
const changeStyle = () => {
  let html = document.querySelector('html')
  let body = document.querySelector('body')
  let app = document.querySelector('#app')
  html.style.fontSize = '37.5px'
  html.style.width = '375px'
  html.style.height = '667px'
  html.style.margin = '0 auto'
  html.style.transform = 'translate(0, 5%)'
  html.style.backgroundColor = '#eee'
  html.childNodes[0].style.transform = 'translate(0, 0)'
  body.style.height = '100%'
  app.style.transform = 'translate(0, 0)'
}

// 获取 package.json 中的版本号
const getVersion = () => {
  return config.version
}

/**
 * 输出应用版本以及运维信息
 */
 const appInfo = () => {
  window.console.log(`%cCurrent version: V${getVersion()}`, 'font-family: Cabin, Helvetica, Arial, sans-serif;text-align: left;font-size:32px;color:#B21212;')
}

export {
  getDevice,
  changeStyle,
  getVersion,
  appInfo
}
