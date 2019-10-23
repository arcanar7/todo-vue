<template>
  <form class="login-form" ref="form" @submit="onSubmit">
    <input
      type="email"
      name="email"
      class="login-form__email"
      :class="{
        error: $v.email.$invalid && $v.email.$dirty,
        'valid-input': !$v.email.$invalid,
      }"
      placeholder="Email"
      v-model="email"
      @blur="$v.email.$touch()"
    />
    <input
      type="password"
      name="password"
      class="login-form__password"
      :class="{
        error: $v.password.$invalid && $v.password.$dirty,
        'valid-input': !$v.password.$invalid,
      }"
      placeholder="Password"
      v-model="password"
      @blur="$v.password.$touch()"
    />
    <button type="submit" class="login-form__btn">
      <div class="lds-ring" v-if="loadingApp">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span v-else>log in</span>
    </button>
    <span class="login-form__forgot">
      <router-link to="/registration" class="login-form__forgot">
        Forgot Password?
      </router-link>
    </span>
  </form>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: null,
      password: null,
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
    onSubmit(e) {
      this.$store.dispatch('setLoading', true)
      setTimeout(() => {
        this.$store.dispatch('setLoading', false)
      }, 5000)

      if (this.email && this.password) {
        this.$router.push('/')
      }
      e.preventDefault()

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
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
    },
  },
}
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  margin: 30px 0;

  &__email,
  &__password,
  &__name {
    &:focus {
      border: 2px solid $primary;
      height: 38px;
    }
  }

  input + input,
  &__btn,
  &__forgot {
    margin-top: 10px;
  }

  &__forgot {
    text-align: end;
    font-size: 14px;
    color: $primary;
  }
}

.error {
  box-shadow: 0 0 5px red;
}

.valid-input {
  border: 2px solid $success-dark;
  height: 38px;
}
</style>
