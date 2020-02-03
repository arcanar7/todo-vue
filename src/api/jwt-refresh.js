import router from '../router/router'
import store from '../store/store'

export async function fetchWithAuth(url, options) {
  const loginUrl = '/login?loginError=true'
  const tokenData = store.getters.tokens

  if (tokenData) {
    if (Date.now() >= tokenData.expDate * 1000) {
      try {
        const newToken = await refreshToken(tokenData.refreshToken)
        store.dispatch('setToken', newToken)
      } catch (e) {
        return router.push(loginUrl)
      }
    }
    options.headers.Authorization = `Bearer ${store.getters.accessToken}`
  }

  return fetch(url, options)
}

function refreshToken(refreshToken) {
  return fetch(`${process.env.VUE_APP_api}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  }).then(res => {
    if (res.status === 200) return res.json()
    return Promise.reject()
  })
}
