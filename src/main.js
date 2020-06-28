//引入插件
import Vue from 'vue'
import router from './router/index.js'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios' // 帮我们把axios的作用域对象挂载到Vue实例上，方便我们用this调用
import { Message } from 'element-ui';
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie';
// 引入组件
import App from './App.vue'
import Env from './env.js'; // env.js是我们创建的环境变量的配置文件
// 引入样式文件
import Normalize from 'normalize.css'
import '@/common/less/iconfont.less';
import 'element-ui/lib/theme-chalk/index.css';
// 引入脚本文件
import '@/common/js/iconfont.js';

// mock开关
const mock = false;
if(mock){
  /** 
   * 这里选用require引入的原因是：
   *  –- require是运行时调用，所以require理论上可以运用在代码的任何地方
   *  –- import是编译时调用，所以必须放在文件开头
  */
  require('./mock/api');
}

// 基本配置（应用于每个请求的配置默认值）
// 根据前端的跨域方式调整
// 1) 代理跨域
axios.defaults.baseURL = '/api';
// 2) CORS || JSONP 跨域
// axios.defaults.baseURL = Env.baseURL;
axios.defaults.timeout = 8000 // 请求超时等待时长（单位毫秒）

// 接口错误拦截
axios.interceptors.response.use(function(config){
  // 这里的参数config只是一个包含有响应数据的对象，还不是真正的data值
  let res = config.data;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    // 这里暂时定为status:10为未登录状态
    /**
     *  -- 因为这里是main.js文件，this指向不了Vue实例，故此无法使用router路由跳转
     *  -- 这里使用window.location.href跳转
     *  -- 项目是hash路由
     */
    if(location.hash != '#/index'){
      window.location.href = '/#/userdeel/login';
      return Promise.reject(res);
    }
  }else{
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  // 拦截的第二个函数是服务器响应500时的错误信息，或者可以理解为不是内部代码的错误信息
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios,axios); // 这里的顺序不能交换
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  error: '/imgs/detail/load-failure.jpg',
  loading: '/imgs/loading-svg/loading-bars.svg',
});
Vue.prototype.$message = Message;
Vue.config.productionTip = false // productionTip是生产模式下的提示信息，开发模式下默认是关闭的

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
