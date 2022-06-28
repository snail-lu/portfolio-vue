import { createApp } from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import '@/styles/index.scss'; // global css

import App from './App.vue';
import store from './store';
import router from './router';
import request from '@/utils/request';
import uploader from 'vue-simple-uploader';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

import '@/router/permission'; // permission control

const app = createApp(App);
app.use(router);
app.use(store);

app.use(uploader);
// 替代Vue.prototype.xxx = xxxx;
app.config.globalProperties.req = request;
app.config.globalProperties.$message = ElMessage;
app.mount('#app');
