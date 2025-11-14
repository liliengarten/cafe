import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'

createApp(App).use(router).mount('#app')

export const baseUrl = 'http://ykefkfi-m2.wsr.ru/api-tort'
export const storageUrl = 'http://ykefkfi-m2.wsr.ru/storage'
