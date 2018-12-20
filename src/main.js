import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/icons' // icon
import '@/common/js/permission' // permission control
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
fastclick.attach(document.body)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
