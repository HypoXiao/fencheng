import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from '@/pages/login'
import Statistics from '@/pages/statistics'
import Register from '@/pages/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: { hasLogin: true }, // 需要登录
      children: [
        {
          name: 'statistics',
          path: '',
          component: Statistics
        },
        {
          name: 'register',
          path: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { loginPage: true },
      component: Login
    }
  ]
})
