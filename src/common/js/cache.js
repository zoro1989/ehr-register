import storage from 'good-storage'
import { api } from '@/config'
import fetch from 'utils/fetch'
import router from '@/router'
const TOKEN_KEY = '__token__'
let timer
export function refreshToken() {
  if (timer) {
    clearInterval(timer)
  }
  timer = setInterval(() => {
    let tokenStr = storage.get(TOKEN_KEY, '')
    if (!tokenStr) {
      router.push('/login')
      return
    }
    fetch('post', api.authRefresh, {token: tokenStr}).then((res) => {
      storage.set(TOKEN_KEY, res.token)
    }).catch(() => {
    })
  }, 60 * 1000 * 10)
}
export function setToken(tokenStr) {
  return storage.set(TOKEN_KEY, tokenStr)
}
export function getToken() {
  return storage.get(TOKEN_KEY, '')
}
export function clearToken () {
  storage.remove(TOKEN_KEY)
}
