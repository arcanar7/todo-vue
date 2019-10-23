import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
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
      component: Home,
    },
    {
      path: '/login',
      component: Auth,
      // redirect: '/todo',
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
      ],
    },
    { path: '*', component: () => import('@/components/NotFound.vue') },
  ],
})
