import './assets/main.css'
import '../node_modules/flowbite-vue/dist/index.css'
import Vue3Toasity from 'vue3-toastify';
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
.use(Vue3Toasity, {
  autoClose: 3000,
  position: 'top-right',
})
.mount('#app')
