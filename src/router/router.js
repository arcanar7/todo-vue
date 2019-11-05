import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/views/Auth.vue'
import Login from '@/components/Login.vue'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: AuthGuard,
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/login',
      component: Auth,
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
        },
        {
          path: '/registration',
          name: 'registration',
          component: () => import('@/components/Registration.vue'),
        },
        {
          path: '/reset',
          name: 'reset',
          component: () => import('@/components/ResetPassword.vue'),
        },
      ],
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/components/NotFound.vue'),
    },
    { path: '*', redirect: '/404' },
  ],
})
