import axios from 'axios'
import {
  Message
} from 'element-ui'
import router from '../router'
// create an axios instance
// 用户未登录
const USER_NOT_LOGIN_ERROR = '0030072'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers.token = localStorage.getItem('token')

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 如果服务器的状态码不为200，说明请求异常，应给出错误提示。
    // 取得响应
    let success = res.success;
    let result = res.result;
    // console.log(response,'111',result.code)
    // console.log('resp:' + success + ',result:' + result);
    // 判断用户是否登录
    if (success && res.result && USER_NOT_LOGIN_ERROR == result.code) {
      // window.location.href = result.loginUrl
      router.replace({ path: '/login' })
    } else if (res.code !== 200) {
      Message({
        message: res.message || 'Error check your token or method',
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service.request