<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
$assets: '/assets/fonts';

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src: url('#{$assets}/roboto-v20-latin_cyrillic-700.woff2')
      format('font-woff2'),
    url('#{$assets}/roboto-v20-latin_cyrillic-700.woff') format('font-woff');
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url('#{$assets}/roboto-v20-latin_cyrillic-regular.woff2')
      format('font-woff2'),
    url('#{$assets}/roboto-v20-latin_cyrillic-regular.woff') format('font-woff');
}

@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  src: url('#{$assets}/roboto-v20-latin_cyrillic-700italic.woff2')
      format('font-woff2'),
    url('#{$assets}/roboto-v20-latin_cyrillic-700italic.woff')
      format('font-woff');
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  src: url('#{$assets}/roboto-v20-latin_cyrillic-900.woff2')
      format('font-woff2'),
    url('#{$assets}/roboto-v20-latin_cyrillic-900.woff') format('font-woff');
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
