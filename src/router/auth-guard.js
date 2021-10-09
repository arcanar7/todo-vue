import { getLocalStorageData } from '../helpers/localStorage.helper';

export default function authGuard(to, from, next) {
  const { data } = getLocalStorageData();

  if (data?.Auth?.user) {
    next();
  } else {
    next('/login?loginError=true');
  }
}
