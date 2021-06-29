import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import vant from '@/components/vant'
import 'amfe-flexible/index.js'

const app = createApp(App)

app.use(router)
  .use(vant)

app.mount('#app')
