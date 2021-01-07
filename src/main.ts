import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router/index'
import { setupToast } from '@/plugins/toast'
import { setupElement } from '@/plugins/element'
import '@/assets/style/public.scss'

const app = createApp(App)

setupRouter(app)
setupToast(app)
setupElement(app)

app.mount('#app')
