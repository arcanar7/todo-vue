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
          'has-error': isValidErrorEmail,
          'valid-input': !isInvalidEmail,
        }"
        :placeholder="$t('login.ph-email')"
        v-model="email.title"
        @blur="email.touch()"
      />
      <span v-if="isValidErrorEmail" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!isRequiredEmail">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!isEmail">
          {{ $t('validation.email') }}
        </template>
      </span>
      <button type="submit" class="login-form__btn" :disabled="isInvalidEmail">
        <app-spinner v-if="loadingApp"></app-spinner>
        {{ $t('reset.reset-pass') }}
      </button>
    </form>
  </section>
</template>

<script>
import AuthMixin from '@/mixins/auth.mixin'
const AppSpinner = () =>
  import(
    /* webpackChunkName: "AppSpinner.component" */ '@/components/AppSpinner'
  )

export default {
  name: 'ResetPasswordPage',
  components: { AppSpinner },
  mixins: [AuthMixin],
}
</script>
