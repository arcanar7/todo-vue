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

export default {
  name: 'LoginPage',
  components: { AppSpinner },
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
