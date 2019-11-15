import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard'
import HomePage from '@/views/HomePage'
import AuthPage from '@/views/AuthPage'
import LoginPage from '@/components/LoginPage'
import RegistrationPage from '@/components/RegistrationPage'
import ResetPasswordPage from '@/components/ResetPasswordPage'
import NotFoundPage from '@/components/NotFoundPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: AuthGuard,
      component: HomePage,
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
          component: RegistrationPage,
        },
        {
          path: '/reset',
          name: 'reset',
          component: ResetPasswordPage,
        },
      ],
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundPage,
    },
    { path: '*', redirect: '/404' },
  ],
})
