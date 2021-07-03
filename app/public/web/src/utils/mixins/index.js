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
  html.style.height = '667px'
  html.style.transform = 'translate(0, 5%)'
  html.style.backgroundColor = '#eee'
  html.childNodes[0].style.transform = 'translate(0, 0)'
  body.style.width = '375px'
  body.style.height = '100%'
  body.style.margin = '0 auto'
  app.style.transform = 'translate(0, 0)'
}

export {
  getDevice,
  changeStyle
}
