<template>
  <section class="center">
    <h1 class="title">{{ $t('login.title') }}</h1>
    <p class="error-title" v-if="isError">{{ isError }}</p>
    <p class="success-title" v-if="isSuccess">{{ isSuccess }}</p>
    <form class="login-form" @submit.prevent="onSubmit('loginUser')" novalidate>
      <label class="login-form__label" for="email">
        {{ $t('login.ph-email') }}
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
        <icon-base
          icon-name="warning"
          width="10px"
          height="10px"
          viewBox="0 0 192 512"
        >
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
        {{ $t('login.ph-password') }}
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
        <icon-base
          icon-name="warning"
          width="10px"
          height="10px"
          viewBox="0 0 192 512"
        >
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
import AuthMixin from '@/mixins/auth.mixin'
import AppSpinner from '@/components/AppSpinner'
import IconBase from '@/components/IconBase'
import IconWarning from '@/components/icons/IconWarning'

export default {
  name: 'LoginPage',
  components: {
    AppSpinner,
    IconBase,
    IconWarning,
  },
  mixins: [AuthMixin],
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
