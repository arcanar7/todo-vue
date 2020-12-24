export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
    success: null,
    isOnLine: true,
    notification: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccess(state, payload) {
      state.success = payload;
    },
    clearSuccess(state) {
      state.success = null;
    },
    setIsOnLine(state, payload) {
      state.isOnLine = payload;
    },
    setNotification(state, payload) {
      state.notification = payload;
    },
  },
};
