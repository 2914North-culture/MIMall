//引入插件
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios' // 帮我们把axios的作用域对象挂载到Vue实例上，方便我们用this调用
// 引入组件
import App from './App.vue'
import Env from './env.js';

Vue.use(VueAxios,axios); // 这里的顺序不能交换
Vue.config.productionTip = false // productionTip是生产模式下的提示信息，开发模式下默认是关闭的

// 根据前端的跨域方式调整
// 1) 代理跨域
// axios.defaults.baseURL = '/api';
// 2) CORS || JSONP 跨域
axios.defaults.baseURL = Env.baseURL;
axios.defaults.timeout = 8000 // 请求超时等待时长（单位毫秒）

// 接口错误拦截
axios.interceptors.response.use(function(config){
  let res = config.data;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    // 这里暂时定为status:10为未登录状态
    window.location.href = '/#/login'  // 项目是hash路由
  }else{
    return 
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
