<template>
  <div class="not-found-wrapper">
    <header class="not-found-header">
      <h1 class="not-found-header__title">{{ $t('title') }}</h1>
    </header>
    <main class="not-found-main">
      <h2 class="not-found-main__title">{{ $t('not-found.title') }}</h2>
    </main>
    <nav class="not-found-nav">
      <router-link to="/" class="not-found-nav__home">
        {{ $t('not-found.home') }}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>

<style lang="scss">
.not-found-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.not-found-header {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-top: 20px;

  &__title {
    font-weight: 900;
    color: $text-primary;
    text-align: center;
  }
}

.not-found-main {
  margin-top: 20px;

  &__title {
    font-weight: 900;
    color: $text-primary;
    text-align: center;
  }
}

.not-found-nav {
  margin-top: 20px;

  &__home {
    padding: 10px;
    color: $primary-lightness;
    background-color: $text-primary;
    border-radius: 5px;
    box-shadow: 4px 4px 4px hsla(0, 0, 0, 0.5);

    &:hover,
    &:focus {
      text-decoration: none;
    }

    &:active {
      color: $primary-lightness;
      box-shadow: 2px 2px 2px hsla(0, 0, 0, 0.5);
    }
  }
}
</style>
