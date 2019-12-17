export default {
  state: {
    loading: false,
    localLoading: false,
    error: null,
    success: null,
    isOnLine: true,
    notification: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setLocalLoading(state, payload) {
      state.localLoading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setSuccess(state, payload) {
      state.success = payload
    },
    clearSuccess(state) {
      state.success = null
    },
    setIsOnLine(state, payload) {
      state.isOnLine = payload
    },
    setNotification(state, payload) {
      state.notification = payload
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('setLoading', payload)
    },
    setLocalLoading({ commit }, payload) {
      commit('setLocalLoading', payload)
    },
    setError({ commit }, payload) {
      commit('setError', payload)
    },
    clearError({ commit }) {
      commit('clearError')
    },
    setSuccess({ commit }, payload) {
      commit('setSuccess', payload)
    },
    clearSuccess({ commit }) {
      commit('clearSuccess')
    },
    setIsOnLine({ commit }, payload) {
      commit('setIsOnLine', payload)
    },
    setNotification({ commit }, payload) {
      commit('setNotification', payload)
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    localLoading(state) {
      return state.localLoading
    },
    error(state) {
      return state.error
    },
    success(state) {
      return state.success
    },
    isOnLine(state) {
      return state.isOnLine
    },
    notification(state) {
      return state.notification
    },
  },
}
