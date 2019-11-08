<template>
  <section class="center">
    <h1 class="title">{{ $t('reset.title') }}</h1>
    <p class="error-title" v-if="isError">{{ isError }}</p>
    <p class="success-title" v-if="isSuccess">{{ isSuccess }}</p>
    <form class="login-form" @submit.prevent="onResetPass" novalidate>
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
      <button
        type="submit"
        class="login-form__btn"
        :disabled="this.$v.$invalid"
      >
        <spinner v-if="loadingApp"></spinner>
        {{ $t('reset.reset-pass') }}
      </button>
    </form>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

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
  },
}
</script>
