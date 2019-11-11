export default {
  data() {
    return {
      email: null,
      password: null,
      repeatPassword: null,
    }
  },
  computed: {
    isError() {
      return this.$store.getters.error
    },
    isSuccess() {
      return this.$store.getters.success
    },
  },
  beforeCreate() {
    this.$store.dispatch('clearError')
    this.$store.dispatch('clearSuccess')
  },
  methods: {
    onSubmit(act, query = '') {
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
        }
        this.$store
          .dispatch(act, user)
          .then(() => {
            this.$router.push(`/${query}`)
          })
          .catch(() => {})
      }
    },
    onResetPass() {
      const email = this.email
      this.$store
        .dispatch('resetPassword', email)
        .then(() => {
          this.$store.dispatch(
            'setSuccess',
            'Please check your email and click on the provided link to reset your password.'
          )
        })
        .catch(() => {})
    },
  },
}
