import Vue from 'vue'
import Router from 'vue-router'

import AuthPage from '@/views/AuthPage'
import LoginPage from '@/components/LoginPage'
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
      component: () => import('@/views/HomePage'),
    },
    {
      path: '/login',
      component: AuthPage,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginPage,
        },
        {
          path: '/registration',
          name: 'registration',
          component: () => import('@/components/RegistrationPage'),
        },
        {
          path: '/reset',
          name: 'reset',
          component: () => import('@/components/ResetPasswordPage'),
        },
      ],
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/components/NotFoundPage'),
    },
    { path: '*', redirect: '/404' },
  ],
})
