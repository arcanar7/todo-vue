<template>
  <section class="center">
    <h1 class="title">{{ $t('login.title') }}</h1>
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
        :placeholder="$t('login.ph-email')"
        v-model="email"
        @blur="$v.email.$touch()"
      />
      <span v-if="$v.email.$error" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!$v.email.required">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!$v.email.email">
          {{ $t('validation.email') }}
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
        :placeholder="$t('login.ph-password')"
        v-model="password"
        @blur="$v.password.$touch()"
      />
      <span v-if="$v.password.$error" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!$v.password.required">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!$v.password.minLength">
          {{ $t('validation.password') }}
        </template>
      </span>
      <button
        type="submit"
        class="login-form__btn"
        :disabled="this.$v.$invalid"
      >
        <spinner v-if="loadingApp"></spinner>
        {{ $t('login.log-in') }}
      </button>
      <span class="login-form__forgot">
        <router-link to="/reset" class="login-form__forgot">
          {{ $t('login.forgot-password') }}
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
  flex-grow: 1;
  align-items: center;

  .title {
    font-size: 24px;
    font-weight: 900;
    color: $primary;
  }
}

.error-title {
  color: $error;
  background-color: $error-lightness;
  border: 1px solid $error-light;
}

.success-title {
  color: $success;
  background-color: $success-lightness;
  border: 1px solid $success-light;
}

.error-title,
.success-title {
  padding: 5px;
  margin: 0 10px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 5px;
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
      height: 38px;
      background-color: $primary-lightness;
      border: 2px solid $primary;
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
    font-size: 14px;
    color: $primary;
    text-align: end;
  }
}

.has-error {
  height: 38px;
  background-color: $error-lightness;
  border: 2px solid $error-light;
}

.valid-input {
  height: 38px;
  background-color: $success-lightness;
  border: 2px solid $success-light;
}

.message-input {
  max-width: 205px;
  margin-top: 5px;
}

.text-error {
  font-size: 12px;
  color: $error;
}
</style>
