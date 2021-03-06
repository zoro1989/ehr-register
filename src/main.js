import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/icons' // icon
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import Cube from 'cube-ui'

/* eslint-disable no-unused-vars */
// import VConsole from 'vconsole'
/* eslint-disable no-new */
// new VConsole()

Vue.use(Cube)
Vue.config.productionTip = false
/* eslint-disable no-new */
fastclick.attach(document.body)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
