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
      path: '',
      component: Layout,
      redirect: 'home',
      meta: {title: '首页'},
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index')
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import('@/views/overview/index')
        }
      ]
    }
  ]
})
