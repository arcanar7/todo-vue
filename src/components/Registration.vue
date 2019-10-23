<template>
  <form action="#" class="login-form">
    <input
      type="text"
      name="name"
      class="login-form__name"
      :class="{
        error: $v.name.$invalid && $v.name.$dirty,
        'valid-input': !$v.name.$invalid,
      }"
      placeholder="Name"
      v-model="name"
      @blur="$v.name.$touch()"
    />
    <input
      type="email"
      name="email"
      class="login-form__email"
      :class="{
        error: $v.email.$invalid && $v.email.$dirty,
        'valid-input': !$v.email.$invalid,
      }"
      placeholder="Email"
      v-model="email"
      @blur="$v.email.$touch()"
    />
    <input
      type="password"
      name="password"
      class="login-form__password"
      :class="{
        error: $v.password.$invalid && $v.password.$dirty,
        'valid-input': !$v.password.$invalid,
      }"
      placeholder="Password"
      v-model="password"
      @blur="$v.password.$touch()"
    />
    <button type="submit" class="login-form__btn">
      <div class="lds-ring" v-if="loadingApp">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span v-else>create account</span>
    </button>
  </form>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: null,
      password: null,
      name: null,
    }
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
      maxLength: maxLength(15),
    },
  },
}
</script>

<style lang="scss"></style>
