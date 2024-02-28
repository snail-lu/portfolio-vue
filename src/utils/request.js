import axios from 'axios';
// import { Message } from 'element-ui'
// create an axios instance

const service = axios.create({
    baseURL: 'https://portfolio.usemock.com', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    // timeout: 500000 // request timeout
    timeout: 20000 // 超时时间
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        // config.headers.token = localStorage.getItem('token')

        return config;
    },
    (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    (res) => {
        if (res.status !== 200) {
            // Message({
            //     message: 'Request Error',
            //     type: 'error',
            //     duration: 2 * 1000
            // });
            return Promise.reject(new Error('Error'));
        } else {
            return Promise.resolve(res.data);
        }
    },
    (error) => {
        console.log('err' + error); // for debug
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 2 * 1000
        // });
        let config = error.config;
        if (!config) return Promise.reject(error);
        const { retryCount = 0, retryDelay = 300, retryTimes = 2 } = config;
        // 记录已经重试的次数
        config.retryCount = retryCount;

        // 判断是否超过了重试次数
        if (retryCount >= retryTimes) {
            return Promise.reject(error);
        }
        // 增加重试次数
        config.retryCount++;
        // 延时处理后重新发起请求
        setTimeout(() => {
            service(config);
        }, retryDelay);
    }
);

export default service;
