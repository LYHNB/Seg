import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons' // icon
import api from './api'
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$api = api; // 将api挂载到vue的原型上

console.log(process.env);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')