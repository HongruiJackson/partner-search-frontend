import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPersist from 'pinia-plugin-persist' //https://blog.csdn.net/Only1oveYou/article/details/134751047
import App from './App.vue'
import router from './router'

import 'vant/es/toast/style'
import 'vant/es/notify/style'

const app = createApp(App)
app.use(createPinia().use(piniaPersist))
app.use(router)

app.mount('#app')
