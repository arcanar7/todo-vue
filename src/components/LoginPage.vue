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
        <app-spinner v-if="loadingApp"></app-spinner>
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
import { email, minLength } from 'vuelidate/lib/validators'

import AuthMixin from '@/mixins/auth.mixin'
const AppSpinner = () =>
  import(
    /* webpackChunkName: "AppSpinner.component" */ '@/components/AppSpinner'
  )

const required = () => import('vuelidate/lib/validators').then(m => m.required)

export default {
  name: 'LoginPage',
  components: { AppSpinner },
  mixins: [AuthMixin],
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
