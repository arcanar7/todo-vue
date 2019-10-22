<template>
  <form class="login-form" ref="form" validation>
    <input
      type="email"
      name="email"
      class="login-form__email"
      placeholder="email"
      v-model="email"
    />
    <input
      type="password"
      name="password"
      class="login-form__password"
      placeholder="password"
      v-model="password"
    />
    <button type="submit" class="login-form__btn" @click="onSubmit">
      sign in
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      show: false,
      show1: false,
      show2: false,
      rulesApp: {
        required: v => !!v || 'Required',
        min: v =>
          v.length >= 6 || 'Password must be equal or more than 6 characters',
        emailValid: v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'E-mail must be valid',
        passwordMatch: v => v === this.password || 'Passwords should match',
      },
    }
  },
  methods: {
    onSubmit() {
      this.$router.push('/')
      // if (this.$refs.form.validate()) {
      //   const user = {
      //     email: this.email,
      //     password: this.password,
      //   }
      //   this.$store
      //     .dispatch(user)
      //     .then(() => {
      //       this.$router.push('/todo')
      //     })
      //     .catch(() => {})
      // }
    },
  },
}
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  margin: 30px 0;

  // &__email {}

  // &__password {}

  input + input,
  &__btn {
    margin-top: 10px;
  }
}
</style>
