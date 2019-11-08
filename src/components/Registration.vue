<template>
  <section class="center">
    <h1 class="title">{{ $t('register.title') }}</h1>
    <p class="error-title" v-if="isError">{{ isError }}</p>
    <form
      class="login-form"
      @submit.prevent="onSubmit('registerUser', 'login?registerSuccess=true')"
      novalidate
    >
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
      <input
        type="password"
        name="repeatPassword"
        class="login-form__password"
        :class="{
          'has-error': $v.repeatPassword.$error,
          'valid-input': !$v.repeatPassword.$invalid,
        }"
        :placeholder="$t('register.ph-repeat-password')"
        v-model="repeatPassword"
        @blur="$v.repeatPassword.$touch()"
      />
      <span v-if="$v.repeatPassword.$error" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!$v.repeatPassword.required">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!$v.repeatPassword.sameAsPassword">
          {{ $t('validation.repeat-pass') }}
        </template>
      </span>
      <button
        type="submit"
        class="login-form__btn"
        :disabled="this.$v.$invalid"
      >
        <spinner v-if="loadingApp"></spinner>
        {{ $t('register.create') }}
      </button>
    </form>
  </section>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

import AuthMixin from '../mixins/auth.mixin'
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
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
}
</script>
