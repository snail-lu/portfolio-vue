import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en' // lang i18n
import znLcale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'
import request from '@/utils/request'

import '@/permission' // permission control

import uploader from 'vue-simple-uploader'

// set ElementUI lang to EN
Vue.use(ElementUI, { znLcale })
Vue.use(uploader)

Vue.prototype.req = request

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
})
