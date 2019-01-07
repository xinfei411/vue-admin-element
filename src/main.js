// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ajax from './axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as custom from './filter'

Vue.config.productionTip = false

//注册全局过滤器
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

//所有实例注入ajax
Object.assign(Vue.prototype,ajax);

//全局配置ElementUI控件尺寸，管理系统一般选用较小尺寸
Vue.use(ElementUI, { size: 'small'});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
