import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Notifications from '@kyvg/vue3-notification'
import vClickOutside from 'click-outside-vue3'

import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Notifications)
app.use(vClickOutside)

app.mount('#app')
