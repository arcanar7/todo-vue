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
      <input
        type="password"
        name="password"
        class="login-form__password"
        :class="{
          'has-error': isValidErrorPassword,
          'valid-input': !isInvalidPassword,
        }"
        :placeholder="$t('login.ph-password')"
        v-model="password.title"
        @blur="password.touch()"
      />
      <span v-if="isValidErrorPassword" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!isRequiredPassword">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!isMinLength">
          {{ $t('validation.password') }}
        </template>
      </span>
      <input
        type="password"
        name="repeatPassword"
        class="login-form__password"
        :class="{
          'has-error': isValidErrorRepeatPassword,
          'valid-input': !isInvalidRepeatPassword,
        }"
        :placeholder="$t('register.ph-repeat-password')"
        v-model="repeatPassword.title"
        @blur="repeatPassword.touch()"
      />
      <span v-if="isValidErrorRepeatPassword" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!isRequiredRepeatPassword">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!isSameAs">
          {{ $t('validation.repeat-pass') }}
        </template>
      </span>
      <button
        type="submit"
        class="login-form__btn"
        :disabled="isRegistrationValid"
      >
        <app-spinner v-if="loadingApp"></app-spinner>
        {{ $t('register.create') }}
      </button>
    </form>
  </section>
</template>

<script>
import AuthMixin from '@/mixins/auth.mixin'
import AppSpinner from '@/components/AppSpinner'

export default {
  name: 'RegistrationPage',
  components: { AppSpinner },
  mixins: [AuthMixin],
}
</script>
