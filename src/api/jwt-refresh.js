import router from '../router/router'
import store from '../store/store'

export async function fetchWithAuth(url, options) {
  const loginUrl = '/login?loginError=true' // url страницы для авторизации
  // let tokenData = null // объявляем локальную переменную tokenData

  // if (sessionStorage.authToken) {
  //   // если в sessionStorage присутствует tokenData, то берем её
  //   tokenData = JSON.parse(localStorage.tokenData)
  // } else {
  //   return window.location.replace(loginUrl) // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
  // }

  // if (!options.headers) {
  //   // если в запросе отсутствует headers, то задаем их
  //   options.headers = {}
  // }

  const tokenData = store.getters.tokens

  console.log('tokenData1: ', tokenData)

  if (tokenData) {
    if (Date.now() >= tokenData.expDate * 1000) {
      // проверяем не истек ли срок жизни токена
      console.log('tokenData.expDate: ', tokenData.expDate)
      try {
        const newToken = await refreshToken(tokenData.refreshToken) // если истек, то обновляем токен с помощью refresh_token
        // saveToken(newToken)
        console.log('newToken: ', newToken)
      } catch (e) {
        // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
        return router.push(loginUrl)
      }
    }

    options.headers.Authorization = `Bearer ${tokenData.accessToken}` // добавляем токен в headers запроса
  }

  return fetch(url, options) // возвращаем изначальную функцию, но уже с валидным токеном в headers
}

async function refreshToken(refreshToken) {
  return fetch(`${process.env.VUE_APP_api}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  }).then(res => {
    if (res.status === 200) {
      // saveToken(JSON.stringify(tokenData)) // сохраняем полученный обновленный токен в sessionStorage, с помощью функции, заданной ранее
      return res.json()
      // return Promise.resolve()
    }
    return Promise.reject()
  })
}
