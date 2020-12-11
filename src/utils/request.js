import axios from 'axios'
import { Loading, Message } from 'element-ui'
import Qs from 'qs'
import store from '../store'
import { getToken } from '@base/utils/auth'
import { debounce } from '@base/utils'

let loadingInstance = null
let loadingCount = 0
const TIMEOUT = 30000

// 创建axios实例
const service = axios.create({
  timeout: TIMEOUT // 请求超时时间
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  (error) => {
    // Do something with request error
    debouncePopError('网络开小差了 请稍等一会儿')
    closeLoading()
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use((response) => {
  return response.data
})

const request = async (
  method,
  url,
  params,
  config = {
    isFilter: true,
    isLoading: true,
    isError: true
  }
) => {
  const { isFilter = true, isLoading = true, isError = true, timeout = TIMEOUT } = config

  if (isLoading !== false) {
    startLoading()
  }
  try {
    let res = null
    if (method === 'get') {
      let query = ''
      if (typeof params !== 'string') {
        query = Qs.stringify(params)
      }
      if (query) {
        url += (url.indexOf('?') > -1 ? '&' : '?') + query
      }
      res = await service.get(url, { headers: { isLoading }, timeout })
    } else if (method === 'post') {
      res = await service.post(url, params, { headers: { isLoading }, timeout })
    } else if (method === 'delete') {
      res = await service.delete(url, { headers: { isLoading }, timeout })
    } else if (method === 'put') {
      res = await service.put(url, params, { headers: { isLoading }, timeout })
    }

    if (isLoading !== false) {
      closeLoading()
    }
    const { message, result, status, code, data } = res
    const tokenCodeErrList = [
      52000 // 未登录、登录超时
    ]

    if (status === 'OK') {
      if (isFilter) {
        // 因为框架问题需要保证兼容性
        return message || result
      } else {
        return res
      }
    } else if (code === 200) {
      if (isFilter) {
        return data
      } else {
        return res
      }
    } else {
      // 登录状态有问题，重置后跳转到登录页面
      if (tokenCodeErrList.indexOf(+message) >= 0) {
        store.dispatch('FedLogOut').then(() => {
          debouncePopError('登录超时，请重新登录')
        })
      } else {
        isError && debouncePopError(message)
      }
      // reject该错误，并不会进入catch
      return Promise.reject(res)
    }
  } catch (e) {
    debouncePopError('网络开小差了 请稍等一会儿')
    if (isLoading !== false) {
      closeLoading()
    }
    throw e
  }
}

const debouncePopError = debounce(function (message = '网络开小差了 请稍等一会儿！') {
  Message.error({
    message: message,
    showClose: true
  })
}, 500)

function startLoading () {
  if (loadingCount === 0 && !loadingInstance) {
    loadingInstance = Loading.service({ fullscreen: true })
  }
  loadingCount++
}

function closeLoading () {
  loadingCount--
  loadingCount = Math.max(loadingCount, 0)
  toCloseLoading()
}

const toCloseLoading = debounce(() => {
  if (loadingCount === 0) {
    loadingInstance && loadingInstance.close()
    loadingInstance = null
  }
}, 300)

/***
 * 正常请求方法，支持过滤返回结果
 * @param url
 * @param params
 * @param config = {
 *   isFilter = true, 是否直接滤出结果，不返回code和msg
 *   isLoading = true，是否展示loading动画
 *  }
 * @returns {Promise<*|null|undefined>}
 */
const httpGet = (url, params = {}, config) => request('get', url, params, config)

const httpPost = (url, params = {}, config) => request('post', url, params, config)

const httpDelete = (url, params = {}, config) => request('delete', url, params, config)

const httpPut = (url, params = {}, config) => request('put', url, params, config)

/***
 * 兼容老接口对应的请求方法，不支持过滤返回结果
 * @param url
 * @param params
 * @param config = {
 *   isFilter = false, 默认false，是否直接滤出结果，不返回code和msg
 *   isLoading = true，是否展示loading动画
 *  }
 * @returns {Promise<*|null|undefined>}
 */
const baseHttpGet = (url, params = {}, config) => request('get', url, params, { isFilter: false, ...config })

const baseHttpPost = (url, params = {}, config) => request('post', url, params, { isFilter: false, ...config })

const baseHttpDelete = (url, params = {}, config) => request('delete', url, params, { isFilter: false, ...config })

const baseHttpPut = (url, params = {}, config) => request('put', url, params, { isFilter: false, ...config })

// 上传
const httpUpload = async (url, file, fileName, config = {}) => {
  const { isLoading = true } = config
  if (isLoading !== false) {
    startLoading()
  }
  let res = null
  const uploadAxios = axios.create()
  uploadAxios.defaults.timeout = 60000 * 30
  const requestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'arraybuffer'
  }

  const fileData = new FormData()
  fileData.append(fileName, file, file.name)
  try {
    res = await uploadAxios.post(url, fileData, requestConfig)
    if (isLoading !== false) {
      closeLoading()
    }
  } catch (err) {
    if (isLoading !== false) {
      closeLoading()
    }
  }

  if (res.headers['content-type'].indexOf('application/vnd.ms-excel') !== -1) {
    const blob = new Blob([res.data])
    const alink = document.createElement('a')
    let remoteName = ''
    const attr = res.headers['content-disposition']
    if (attr && attr.split('filename=')) {
      if (Array.isArray(attr.split('filename=')) && attr.split('filename=').length > 1) {
        remoteName = decodeURI(res.headers['content-disposition'].split('filename=')[1])
      }
    }
    if (remoteName) {
      alink.download = remoteName
    } else {
      alink.download = '导入失败信息.xlsx'
    }
    alink.style.display = 'none'
    alink.href = URL.createObjectURL(blob) // 这里是将文件流转化为一个文件地址
    document.body.appendChild(alink)
    alink.click()
    URL.revokeObjectURL(alink.href) // 释放URL 对象
    document.body.removeChild(alink)
    return {
      status: 'FAIL',
      message: '导入失败'
    }
  } else {
    const enc = new TextDecoder('utf-8')
    return JSON.parse(enc.decode(new Uint8Array(res.data))) // 转化成json对象
  }
}

/****
 * 导出功能强烈推荐使用 下面的***httpExportSimple**** get方法，
 * 除非请求参数很多只能用post类型才用httpExport，此方法中文会有乱码问题，推荐主动传fileName可解决
 * @param method
 * @param url
 * @param params
 * @param fileName
 * @returns {Promise<any|{message: string, status: string}>}
 */
const httpExport = async (method, url, params, fileName, config = {}) => {
  const { isLoading = true } = config
  if (isLoading !== false) {
    startLoading()
  }
  try {
    let res = null
    const exportAxios = axios.create()
    exportAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    exportAxios.defaults.responseType = 'arraybuffer'
    if (method === 'get') {
      let query = ''
      if (typeof params !== 'string') {
        query = Qs.stringify(params)
      }
      if (query) {
        url += (url.indexOf('?') > -1 ? '&' : '?') + query
      }
      res = await exportAxios.get(url)
    } else if (method === 'post') {
      res = await exportAxios.post(url, params)
    } else if (method === 'delete') {
      res = await exportAxios.delete(url)
    } else if (method === 'put') {
      res = await exportAxios.put(url, params)
    }
    if (isLoading !== false) {
      closeLoading()
    }
    if (res.headers['content-type'].indexOf('application/vnd.ms-excel') !== -1) {
      let remoteName = ''
      const attr = res.headers['content-disposition']
      if (attr && attr.split('filename=')) {
        if (Array.isArray(attr.split('filename=')) && attr.split('filename=').length > 1) {
          remoteName = decodeURI(res.headers['content-disposition'].split('filename=')[1])
        }
      }

      const blob = new Blob([res.data])
      const alink = document.createElement('a')
      if (fileName) {
        alink.download = fileName + '.csv'
      } else if (remoteName) {
        alink.download = remoteName
      } else {
        alink.download = Date.now() + '.csv'
      }
      alink.style.display = 'none'
      alink.href = URL.createObjectURL(blob) // 这里是将文件流转化为一个文件地址
      document.body.appendChild(alink)
      alink.click()
      URL.revokeObjectURL(alink.href) // 释放URL 对象
      document.body.removeChild(alink)
      return {
        status: 'ERROR',
        message: '导入失败'
      }
    } else {
      const enc = new TextDecoder('utf-8')
      // 转化成json对象
      return JSON.parse(enc.decode(new Uint8Array(res.data)))
    }
  } catch (e) {
    if (isLoading !== false) {
      closeLoading()
    }
    console.error(e)
    debouncePopError('网络开小差了 请稍等一会儿')
    throw e
  }
}

/***
 * 导出或者下载功能推荐使用该方法
 * @param url
 * @param fileName
 * @returns {Promise<void>}
 */
const httpExportSimple = async (url, fileName) => {
  downloadFile(url, fileName)
}

function downloadFile (url, fileName) {
  const alink = document.createElement('a')
  alink.style.display = 'none'
  alink.href = url
  if (fileName) {
    alink.download = fileName
  }
  document.body.appendChild(alink)
  alink.click()
  URL.revokeObjectURL(alink.href) // 释放URL 对象
  document.body.removeChild(alink)
}

// 下载模板（废弃）
const httpDownload = async (url, fileName) => {
  axios({
    method: 'get',
    url,
    responseType: 'blob' // 表明服务器返回的数据类型
  })
    .then(function (res) {
      closeLoading()
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
      fileName = fileName + '.xlsx'
      if ('download' in document.createElement('a')) {
        // 非IE下载
        const aEle = document.createElement('a')
        aEle.download = fileName
        aEle.style.display = 'none'
        aEle.href = URL.createObjectURL(blob)
        document.body.appendChild(aEle)
        aEle.click()
        URL.revokeObjectURL(aEle.href) // 释放URL 对象
        document.body.removeChild(aEle)
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
    })
    .catch(function (error) {
      debouncePopError(error)
      closeLoading()
    })
}

export {
  service,
  request,
  httpGet,
  httpPost,
  httpDelete,
  httpPut,
  httpUpload,
  httpExport,
  httpExportSimple,
  httpDownload,
  baseHttpGet,
  baseHttpPost,
  baseHttpDelete,
  baseHttpPut
}
