<template>
  <form action="#" class="login-form">
    <input type="email" class="login-form__email" placeholder="email" />
    <input
      type="password"
      class="login-form__password"
      placeholder="password"
    />
    <button type="submit" class="login-form__btn">sign in</button>
  </form>
</template>

<script>
export default {}
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  margin-top: 80px;

  input + input,
  &__btn {
    margin-top: 10px;
  }
}
</style>
