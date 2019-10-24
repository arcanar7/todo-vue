<template>
  <section class="center">
    <form class="login-form" @submit.prevent="onSubmit" novalidate>
      <input
        type="text"
        name="name"
        class="login-form__name"
        :class="{
          'has-error': $v.name.$error,
          'valid-input': !$v.name.$invalid,
        }"
        placeholder="Name"
        v-model="name"
        @blur="$v.name.$touch()"
      />
      <span v-if="$v.name.$error" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!$v.name.required">
          Required
        </template>
        <template v-else-if="!$v.name.minLength">
          Name must be equal or more than 4 characters
        </template>
      </span>
      <input
        type="email"
        name="email"
        class="login-form__email"
        :class="{
          'has-error': $v.email.$error,
          'valid-input': !$v.email.$invalid,
        }"
        placeholder="Email"
        v-model="email"
        @blur="$v.email.$touch()"
      />
      <span v-if="$v.email.$error" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!$v.email.required">
          Required
        </template>
        <template v-else-if="!$v.email.email">
          E-mail must be valid
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
        placeholder="Password"
        v-model="password"
        @blur="$v.password.$touch()"
      />
      <span v-if="$v.password.$error" class="message-input text-error">
        <img src="../assets/icons/warning.svg" alt="" />
        <template v-if="!$v.password.required">
          Required
        </template>
        <template v-else-if="!$v.password.minLength">
          Password must be equal or more than 6 characters
        </template>
      </span>
      <button
        type="submit"
        class="login-form__btn"
        :class="[$v.$invalid ? 'disabled-btn' : 'enabled-btn']"
        :disabled="this.$v.$invalid"
      >
        <div class="lds-ring" v-if="loadingApp">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Create account
      </button>
    </form>
  </section>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: null,
      password: null,
      name: null,
    }
  },
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        this.$router.push('/login')
      }
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
}
</script>

<style lang="scss"></style>
