<template>
  <section class="center">
    <h1 class="title">{{ $t('register.title') }}</h1>
    <form class="login-form" @submit.prevent="onSubmit('registerUser', 'login?registerSuccess=true')" novalidate>
      <label class="login-form__label" for="email">
        {{ $t('login.label-email') }}
      </label>
      <input
        type="email"
        name="email"
        id="email"
        class="login-form__email"
        :class="{
          'has-error': isValidErrorEmail,
          'valid-input': !isInvalidEmail,
        }"
        v-model="email.title"
        @blur="email.touch()"
      />
      <span v-if="isValidErrorEmail" class="message-input text-error">
        <icon-base icon-name="warning" width="10px" height="10px" viewBox="0 0 192 512">
          <icon-warning />
        </icon-base>
        <template v-if="!isRequiredEmail">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!isEmail">
          {{ $t('validation.email') }}
        </template>
      </span>
      <label class="login-form__label" for="password">
        {{ $t('login.label-password') }}
      </label>
      <input
        type="password"
        name="password"
        id="password"
        class="login-form__password"
        :class="{
          'has-error': isValidErrorPassword,
          'valid-input': !isInvalidPassword,
        }"
        v-model="password.title"
        @blur="password.touch()"
      />
      <span v-if="isValidErrorPassword" class="message-input text-error">
        <icon-base icon-name="warning" width="10px" height="10px" viewBox="0 0 192 512">
          <icon-warning />
        </icon-base>
        <template v-if="!isRequiredPassword">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!isMinLength">
          {{ $t('validation.password') }}
        </template>
      </span>
      <label class="login-form__label" for="repeatPassword">
        {{ $t('register.label-repeat-password') }}
      </label>
      <input
        type="password"
        name="repeatPassword"
        id="repeatPassword"
        class="login-form__password"
        :class="{
          'has-error': isValidErrorRepeatPassword,
          'valid-input': !isInvalidRepeatPassword,
        }"
        v-model="repeatPassword.title"
        @blur="repeatPassword.touch()"
      />
      <span v-if="isValidErrorRepeatPassword" class="message-input text-error">
        <icon-base icon-name="warning" width="10px" height="10px" viewBox="0 0 192 512">
          <icon-warning />
        </icon-base>
        <template v-if="!isRequiredRepeatPassword">
          {{ $t('validation.required') }}
        </template>
        <template v-else-if="!isSameAs">
          {{ $t('validation.repeat-pass') }}
        </template>
      </span>
      <button type="submit" class="login-form__btn" :disabled="isRegistrationValid">
        <app-spinner v-if="loadingApp" />
        {{ $t('register.create') }}
      </button>
    </form>
  </section>
</template>

<script>
import AuthMixin from '../mixins/auth.mixin';
import AppSpinner from './AppSpinner.vue';
import IconBase from './IconBase.vue';
import IconWarning from './icons/IconWarning.vue';

export default {
  name: 'RegistrationPage',
  components: {
    AppSpinner,
    IconBase,
    IconWarning,
  },
  mixins: [AuthMixin],
};
</script>
