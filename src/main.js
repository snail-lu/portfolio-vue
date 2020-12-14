import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import routes from './rotues';
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: '/home', // 页面基础路径
  routes
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
