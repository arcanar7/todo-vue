<template>
  <section class="center">
    <h1 class="title">Log in account</h1>
    <p class="error-title" v-if="isError">{{ isError }}</p>
    <p class="success-title" v-if="isSuccess">{{ isSuccess }}</p>
    <form class="login-form" @submit.prevent="onSubmit('loginUser')" novalidate>
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
        :disabled="this.$v.$invalid"
      >
        <spinner v-if="loadingApp"></spinner>
        Log in
      </button>
      <span class="login-form__forgot">
        <router-link to="/reset" class="login-form__forgot">
          Forgot password?
        </router-link>
      </span>
    </form>
  </section>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

import AuthMixin from '@/mixins/auth.mixin'
import Spinner from '@/components/Spinner'

export default {
  mixins: [AuthMixin],
  components: { Spinner },
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
  created() {
    if (this.$route.query['loginError']) {
      this.$store.dispatch('setError', 'Please log in to access this page.')
    }
    if (this.$route.query['registerSuccess']) {
      this.$store.dispatch(
        'setSuccess',
        'Success! Your account has been created.'
      )
    }
  },
}
</script>

<style lang="scss">
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;

  .title {
    font-size: 24px;
    color: $primary;
    font-weight: 900;
  }

  .error-title {
    color: $error;
    border: 1px solid $error-light;
    background-color: $error-lightness;
  }

  .success-title {
    color: $success;
    border: 1px solid $success-light;
    background-color: $success-lightness;
  }

  .error-title,
  .success-title {
    font-size: 14px;
    font-weight: 400;
    border-radius: 5px;
    margin: 0 10px;
    padding: 5px;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    width: 211px;
    height: 40px;
    font-size: 16px;
    font-weight: 900;
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
  border: 2px solid $success-light;
  background-color: $success-lightness;
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
</style>
