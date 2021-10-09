import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import AuthPage from '../views/AuthPage.vue';
import LoginPage from '../components/LoginPage.vue';
import RegistrationPage from '../components/RegistrationPage.vue';
import ResetPasswordPage from '../components/ResetPasswordPage.vue';
import NotFoundPage from '../components/NotFoundPage.vue';
import AuthGuard from './auth-guard';

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
    { path: '/:pathMatch(.*)*', name: '404', component: NotFoundPage },
  ],
});
