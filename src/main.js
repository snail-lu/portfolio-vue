import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 按需引入ElementUI组件
import ElementUI from '@/components/ElementUI'

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'
import request from '@/utils/request'

import '@/permission' // permission control

import uploader from 'vue-simple-uploader'

Vue.use(ElementUI)
Vue.use(uploader)

Vue.prototype.req = request

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
})
