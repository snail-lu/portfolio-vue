import axios from 'axios';
// import { Message } from 'element-ui'
// create an axios instance

const service = axios.create({
    baseURL: 'https://www.fastmock.site/mock/570d7b757920a8c74dd3d814aec1242d/portfolio-vue', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 500000 // request timeout
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
        return Promise.reject(error);
    }
);

export default service;
