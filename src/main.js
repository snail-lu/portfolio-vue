import Vue from 'vue';
import Clipboard from 'v-clipboard';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

// 按需引入ElementUI组件
import ElementUI from '@/components/ElementUI';
import { Message } from 'element-ui';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import store from './store';
import router from './router';
import request from '@/utils/request';

import '@/router/permission'; // permission control

import uploader from 'vue-simple-uploader';

Vue.use(ElementUI);
Vue.use(uploader);
Vue.use(Clipboard);

Vue.prototype.req = request;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

const app = Vue.createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
