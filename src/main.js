// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import common from './assets/js/common.js'
import router from './router'
import App from './App'
import echarts from 'echarts'
import { Flexbox, FlexboxItem } from 'vux'
import { AjaxPlugin } from 'vux'

Vue.use(AjaxPlugin)
Vue.use(ElementUI);
import global_ from './components/Global'
Vue.prototype.GLOBAL = global_
Vue.prototype.common = common




Vue.use(VueRouter)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.prototype.$echarts = echarts

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
