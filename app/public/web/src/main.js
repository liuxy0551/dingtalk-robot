import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import vant from '@/components/vant'
// import VConsole from 'vconsole'
import 'amfe-flexible'

const app = createApp(App)

// const vConsole = new VConsole()
app.use(router)
   .use(vant)
   // .use(vConsole)

app.mount('#app')

