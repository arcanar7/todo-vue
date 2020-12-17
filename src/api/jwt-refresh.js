import router from '../router/router';
import store from '../store/store';

function refreshToken(token) {
  return fetch(`${process.env.VUE_APP_api}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return Promise.reject();
  });
}

export default async function fetchWithAuth(url, options) {
  const loginUrl = '/login?loginError=true';
  const tokenData = store.getters.tokens;
  const headers = { ...options.headers };

  if (tokenData) {
    if (Date.now() >= tokenData.expDate * 1000) {
      try {
        const newToken = await refreshToken(tokenData.refreshToken);
        store.dispatch('setToken', newToken);
      } catch (e) {
        return router.push(loginUrl);
      }
    }
    headers.Authorization = `Bearer ${store.getters.accessToken}`;
  }

  return fetch(url, { ...options, ...headers });
}
