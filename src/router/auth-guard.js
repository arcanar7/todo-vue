import store from '../store'

export default function(to, from, next) {
  store.getters.user ? next() : next('/login?loginError=true')
}
