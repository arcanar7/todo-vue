import store from '../store/store';

export default function authGuard(to, from, next) {
  if (store.getters.user && store.getters.refreshToken) {
    next();
  } else {
    next('/login?loginError=true');
  }
}
