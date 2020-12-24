export default {
  namespaced: true,
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
      state.loading = payload;
    },
    setLocalLoading(state, payload) {
      state.localLoading = payload;
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
