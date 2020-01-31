import store from '../store/store'

export default function(to, from, next) {
  store.getters.user && store.getters.refreshToken
    ? next()
    : next('/login?loginError=true')
}
