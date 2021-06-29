import { Button, Tabs, Tab, Search, Tabbar, TabbarItem } from 'vant'

export default {
  install(app) {
    app.use(Button)
      .use(Tabs)
      .use(Tab)
      .use(Search)
      .use(Tabbar)
      .use(TabbarItem)
  }
}
