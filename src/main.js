import Vue from 'vue'
import App from './App.vue'
import router from './router' // 这里引入的是router文件
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
