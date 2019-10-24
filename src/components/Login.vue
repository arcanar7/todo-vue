<template>
  <section class="center">
    <form class="login-form" @submit.prevent="onSubmit" novalidate>
      <input
        type="email"
        name="email"
        class="login-form__email"
        :class="{
          'has-error': $v.email.$error,
          'valid-input': !$v.email.$invalid,
        }"
        placeholder="Email"
        v-model="email"
        @blur="$v.email.$touch()"
      />
      <span v-if="$v.email.$error" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!$v.email.required">
          Required
        </template>
        <template v-else-if="!$v.email.email">
          E-mail must be valid
        </template>
      </span>
      <input
        type="password"
        name="password"
        class="login-form__password"
        :class="{
          'has-error': $v.password.$error,
          'valid-input': !$v.password.$invalid,
        }"
        placeholder="Password"
        v-model="password"
        @blur="$v.password.$touch()"
      />
      <span v-if="$v.password.$error" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!$v.password.required">
          Required
        </template>
        <template v-else-if="!$v.password.minLength">
          Password must be equal or more than 6 characters
        </template>
      </span>
      <button
        type="submit"
        class="login-form__btn"
        :class="[$v.$invalid ? 'disabled-btn' : 'enabled-btn']"
        :disabled="this.$v.$invalid"
      >
        <div class="lds-ring" v-if="loadingApp">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Log in
      </button>
      <span class="login-form__forgot">
        <router-link to="/registration" class="login-form__forgot">
          Forgot password?
        </router-link>
      </span>
    </form>
  </section>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        this.$router.push('/')
      }
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
      background-color: $primary-lightness;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input + input,
  span + input,
  &__btn,
  &__forgot {
    margin-top: 20px;
  }

  &__forgot {
    text-align: end;
    font-size: 14px;
    color: $primary;
  }
}

.has-error {
  border: 2px solid $error-light;
  background-color: $error-lightness;
  height: 38px;
}

.valid-input {
  border: 2px solid $success-dark;
  background-color: $success-light;
  height: 38px;
}

.message-input {
  margin-top: 5px;
  max-width: 205px;
}

.text-error {
  font-size: 12px;
  color: $error;
}

.disabled-btn {
  opacity: 0.4;
  cursor: default;
}

.enabled-btn {
  &:hover {
    background-color: $primary-light;
  }
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
</style>
