import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../src/assets/css/global.css'
import axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
axios.interceptors.request.use((config) => {
  return config
})
axios.interceptors.response.use((config) => {
  return config
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
