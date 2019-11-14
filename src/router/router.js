import Vue from 'vue'
import Router from 'vue-router'

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
      component: () =>
        import(/* webpackChunkName: "HomePage.route" */ '@/views/HomePage'),
    },
    {
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "AuthPage.route" */ '@/views/AuthPage'),
      children: [
        {
          path: '',
          name: 'login',
          component: () =>
            import(
              /* webpackChunkName: "AuthPage.route" */ '@/components/LoginPage'
            ),
        },
        {
          path: '/registration',
          name: 'registration',
          component: () =>
            import(
              /* webpackChunkName: "AuthPage.route" */ '@/components/RegistrationPage'
            ),
        },
        {
          path: '/reset',
          name: 'reset',
          component: () =>
            import(
              /* webpackChunkName: "AuthPage.route" */ '@/components/ResetPasswordPage'
            ),
        },
      ],
    },
    {
      path: '/404',
      name: '404',
      component: () =>
        import(
          /* webpackChunkName: "NotFoundPage.route" */ '@/components/NotFoundPage'
        ),
    },
    { path: '*', redirect: '/404' },
  ],
})
