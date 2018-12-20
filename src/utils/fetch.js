import axios from 'axios'
import { Toast } from 'mint-ui'
import { apiStatus } from '@/config'
import router from '@/router'
// import {getToken} from 'common/js/cache'

axios.defaults.withCredentials = true

let fetch = (type, url, params, isFormData = true, showMessage = false) => {
  let service = axios.create({
    timeout: 30000
  })
  axios.defaults.headers.post['Content-Type'] = isFormData ? 'multipart/form-data;charset=utf-8' : 'application/json;charset=utf-8'
  service.interceptors.request.use(config => {
    // 需要token的在这里生成
    // config.headers['Authorization'] = getToken()
    return config
  }, error => {
    console.log('request error', error)
    return Promise.reject(error)
  })

  service.interceptors.response.use(response => {
    // 如果服务器出错，做出相应的处理，response.data后面的内容根据后端接口修改
    let res = response.data
    if (res.code !== apiStatus.success) {
      if (url !== 'login' && res.result === '401') {
        router.push('/login')
      }
      Toast('错误：' + res.msg)
      return Promise.reject(res)
    } else {
      if (showMessage) {
        Toast(res.msg)
      }
      return res
    }
  }, error => {
    console.log('response error', error)
    Toast('服务器出错：' + error)
    return Promise.reject(error)
  })

  let p = {
    url: url,
    method: type
  }
  if (type === 'get') {
    p.params = params
  } else {
    if (isFormData) {
      let fd = new FormData()
      for (let o in params) {
        fd.append(o, params[o])
      }
      p.data = fd
    } else {
      p.data = JSON.stringify(params)
    }
  }

  return service(p)
}

export default fetch
