import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'views/layout/Layout'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index')
    },
    {
      path: '/home',
      component: Layout,
      meta: {title: '首页'},
      children: [
        {
          path: 'index/:id/:corpId',
          component: () => import('@/views/home/index')
        }
      ]
    },
    {
      path: '/success',
      component: Layout,
      meta: {title: '成功'},
      children: [
        {
          path: 'index',
          component: () => import('@/views/success/index')
        }
      ]
    }
  ]
})
