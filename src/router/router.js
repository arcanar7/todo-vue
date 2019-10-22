import Vue from 'vue'
import Router from 'vue-router'

// import Home from '@/views/Home.vue'
import Auth from '@/views/Auth.vue'
// import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Auth,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/components/Login.vue'),
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
