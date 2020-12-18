export function getLocalStorageData() {
  const data = JSON.parse(localStorage.getItem('vuex'));
  return { data };
}

export function clearStorage() {
  localStorage.clear();
}
