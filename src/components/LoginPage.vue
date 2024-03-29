<template>
  <section class="center">
    <h1 class="title">{{ $t('login.title') }}</h1>
    <p class="success-title" v-if="isSuccess">{{ isSuccess }}</p>
    <form class="login-form" @submit.prevent="onSubmit('loginUser')" novalidate>
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
      <button type="submit" class="login-form__btn" :disabled="isLoginValid">
        <app-spinner v-if="loadingApp" />
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
import { mapMutations } from 'vuex';
import AuthMixin from '../mixins/auth.mixin';
import AppSpinner from './AppSpinner.vue';
import IconBase from './IconBase.vue';
import IconWarning from './icons/IconWarning.vue';

export default {
  name: 'LoginPage',
  components: {
    AppSpinner,
    IconBase,
    IconWarning,
  },
  mixins: [AuthMixin],
  created() {
    if (this.$route.query.loginError) {
      this.setError(this.$t('login.error-message'));
    }
    if (this.$route.query.registerSuccess) {
      this.setSuccess(this.$t('register.success-message'));
    }
  },
  methods: {
    ...mapMutations('Utils', ['setError', 'setSuccess']),
  },
};
</script>
