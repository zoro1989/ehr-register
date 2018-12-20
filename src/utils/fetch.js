import axios from 'axios'
import { apiStatus } from '@/config'
import router from '@/router'
import NProgress from 'nprogress'
// import {getToken} from 'common/js/cache'

axios.defaults.withCredentials = true

let fetch = (type, url, params, isFormData = true, showMessage = false) => {
  NProgress.start()
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
    NProgress.done()
    let res = response.data
    if (res.code !== apiStatus.success) {
      if (url !== 'login' && res.result === '401') {
        router.push('/login')
      }
      const toast = this.$createToast({
        time: 1000,
        txt: '错误：' + res.msg
      })
      toast.show()
      return Promise.reject(res)
    } else {
      if (showMessage) {
        const toast = this.$createToast({
          time: 1000,
          txt: res.msg
        })
        toast.show()
      }
      return res
    }
  }, error => {
    NProgress.done()
    console.log('response error', error)
    const toast = this.$createToast({
      time: 1000,
      txt: '服务器出错：' + error
    })
    toast.show()
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
