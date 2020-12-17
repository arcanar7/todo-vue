<template>
  <section class="center">
    <h1 class="title">{{ $t('reset.title') }}</h1>
    <p class="success-title" v-if="isSuccess">{{ isSuccess }}</p>
    <form class="login-form" @submit.prevent="onResetPass" novalidate>
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
      <button type="submit" class="login-form__btn" :disabled="isInvalidEmail">
        <app-spinner v-if="loadingApp"></app-spinner>
        {{ $t('reset.reset-pass') }}
      </button>
    </form>
  </section>
</template>

<script>
import AuthMixin from '@/mixins/auth.mixin';
import AppSpinner from '@/components/AppSpinner.vue';
import IconBase from '@/components/IconBase.vue';
import IconWarning from '@/components/icons/IconWarning.vue';

export default {
  name: 'ResetPasswordPage',
  components: {
    AppSpinner,
    IconBase,
    IconWarning,
  },
  mixins: [AuthMixin],
};
</script>
