import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 3000,
  hideProgressBar: true,
  closeButton: undefined,
  style: {
    fontFamily: 'Nunito Sans',
  },
} as ToastContainerOptions)
app.use(createPinia())
app.use(router)

app.mount('#app')
